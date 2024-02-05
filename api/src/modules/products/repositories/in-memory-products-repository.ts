import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

import {
	type ProductWithCategory,
	type InsertProduct,
	type Product,
	type Category,
} from '~/config/db/schemas';
import { type PaginatedRequest } from '~/shared/types';
import { normalizeString } from '~/utils';

import { type ListProductsFilters } from '../use-cases/list-products/use-case';
import { type ProductsRepository } from './interface';

export class InMemoryProductsRepository implements ProductsRepository {
	private products: Product[] = [];
	private categories: Category[] = [];

	async insert(payload: InsertProduct): Promise<string> {
		const product: Product = {
			...payload,
			id: createId(),
			categoryId: payload.categoryId ?? null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		if (product.categoryId) {
			this.categories.push({
				id: product.categoryId,
				name: faker.lorem.word(),
				icon: faker.internet.emoji(),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		this.products.push(product);

		return product.id;
	}

	async findByName(name: string): Promise<Product | null> {
		const product = this.products.find((product) =>
			normalizeString(product.name).includes(normalizeString(name)),
		);

		return product || null;
	}

	async findAll(payload: ListProductsFilters & PaginatedRequest): Promise<ProductWithCategory[]> {
		let products = this.products;

		if (payload.name) {
			products = products.filter((product) =>
				normalizeString(product.name).includes(normalizeString(payload.name!)),
			);
		}

		const categoriesMap = new Map<string, Category>(
			this.categories.map((category) => [category.id, category]),
		);

		return products
			.slice((payload.page - 1) * payload.limit, payload.page * payload.limit)
			.map((product) => ({
				product,
				category: product.categoryId ? categoriesMap.get(product.categoryId)! : null,
			}));
	}

	async count(name?: string | undefined): Promise<number> {
		return name
			? this.products.filter((product) =>
					normalizeString(product.name).includes(normalizeString(name)),
			  ).length
			: this.products.length;
	}
}
