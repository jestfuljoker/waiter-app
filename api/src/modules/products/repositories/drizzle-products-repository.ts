import { sql } from 'drizzle-orm';

import { db } from '~/config/db/connection';
import { type Product, type InsertProduct, products } from '~/config/db/schemas';
import { normalizeString } from '~/utils';

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
}
