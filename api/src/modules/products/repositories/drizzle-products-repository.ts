import { eq, sql } from 'drizzle-orm';

import { db } from '~/config/db/connection';
import {
	categories,
	products,
	type InsertProduct,
	type Product,
	type ProductWithCategory,
} from '~/config/db/schemas';
import { type PaginatedRequest } from '~/shared/types';
import { normalizeString } from '~/utils';

import { type ListProductsFilters } from '../use-cases/list-products/use-case';
import { type ProductsRepository } from './interface';

export class DrizzleProductsRepository implements ProductsRepository {
	private normalizedNameWhere(name: string) {
		return sql<string>`unaccent(${products.name}) ILIKE '%' || ${normalizeString(name)} || '%'`;
	}

	async findByName(name: string): Promise<Product | null> {
		const [product] = await db.select().from(products).where(this.normalizedNameWhere(name));

		return product || null;
	}

	async insert(product: InsertProduct): Promise<string> {
		const newProduct = await db.insert(products).values(product).returning({
			id: products.id,
		});

		return newProduct[0].id;
	}

	async findAll({
		limit,
		page,
		name,
	}: ListProductsFilters & PaginatedRequest): Promise<ProductWithCategory[]> {
		const productsListQuery = db
			.select()
			.from(products)
			.leftJoin(categories, eq(products.categoryId, categories.id))
			.offset((page - 1) * limit)
			.limit(limit);

		if (name) {
			productsListQuery.where(this.normalizedNameWhere(name));
		}

		const productsList = await productsListQuery;

		return productsList;
	}

	async count(name?: string | undefined): Promise<number> {
		const countQuery = db.select({ count: sql<number>`count(${products.id})` }).from(products);

		if (name) {
			countQuery.where(this.normalizedNameWhere(name));
		}

		const [{ count }] = await countQuery;

		return Number(count);
	}
}
