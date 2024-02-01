import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { makeCreatedAtAndUpdatedAt, makeId } from './common';
import { products } from './product';

export const ingredients = pgTable('ingredient', {
	...makeId(),

	name: varchar('name', { length: 255 }).notNull(),
	icon: varchar('icon', { length: 255 }).notNull(),
	productId: varchar('productId', { length: 128 })
		.references(() => products.id, { onDelete: 'cascade' })
		.notNull(),

	...makeCreatedAtAndUpdatedAt(),
});

export type InsertIngredient = InferInsertModel<typeof ingredients>;

export type UpdateIngredient = Omit<Partial<InsertIngredient>, 'id'>;

export type Ingredient = InferSelectModel<typeof ingredients>;
