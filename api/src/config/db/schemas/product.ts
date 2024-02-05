import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { index, numeric, pgTable, varchar } from 'drizzle-orm/pg-core';

import { type Category, categories } from './category';
import { makeCreatedAtAndUpdatedAt, makeId } from './common';

export const products = pgTable(
	'product',
	{
		...makeId(),

		name: varchar('name', { length: 255 }).notNull(),
		description: varchar('description', { length: 255 }).notNull(),
		imagePath: varchar('imagePath', { length: 255 }).notNull(),
		price: numeric('price', { precision: 10, scale: 2 }).notNull(),
		categoryId: varchar('categoryId', { length: 128 }).references(() => categories.id, {
			onDelete: 'set null',
		}),

		...makeCreatedAtAndUpdatedAt(),
	},
	(table) => ({
		nameIdx: index('product_name_idx').on(table.name),
		priceIdx: index('product_price_idx').on(table.price),
		categoryIdIdx: index('product_categoryId_idx').on(table.categoryId),
	}),
);

export type InsertProduct = InferInsertModel<typeof products>;

export type UpdateProduct = Omit<Partial<InsertProduct>, 'id'>;

export type Product = InferSelectModel<typeof products>;

export type ProductWithCategory = { product: Product; category: Category | null };
