import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { makeCreatedAtAndUpdatedAt, makeId } from './common';

export const categories = pgTable('category', {
	...makeId(),

	name: varchar('name', { length: 255 }).notNull(),
	icon: varchar('icon', { length: 255 }).notNull(),

	...makeCreatedAtAndUpdatedAt(),
});

export type InsertCategory = InferInsertModel<typeof categories>;

export type UpdateCategory = Omit<Partial<InsertCategory>, 'id'>;

export type Category = InferSelectModel<typeof categories>;
