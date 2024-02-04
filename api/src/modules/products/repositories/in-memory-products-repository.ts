import { createId } from '@paralleldrive/cuid2';

import { type InsertProduct, type Product } from '~/config/db/schemas';
import { normalizeString } from '~/utils';

import { type ProductsRepository } from './interface';

export class InMemoryProductsRepository implements ProductsRepository {
	private products: Product[] = [];

	async insert(payload: InsertProduct): Promise<string> {
		const product: Product = {
			...payload,
			id: createId(),
			categoryId: payload.categoryId ?? null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.products.push(product);

		return product.id;
	}

	async findByName(name: string): Promise<Product | null> {
		const product = this.products.find((product) =>
			normalizeString(product.name).includes(normalizeString(name)),
		);

		return product || null;
	}
}
