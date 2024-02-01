import { createId } from '@paralleldrive/cuid2';
import { timestamp, varchar } from 'drizzle-orm/pg-core';

/**
 * Generates a drizzle unique ID using cuid2.
 */
export function makeId() {
	return {
		id: varchar('id', { length: 128 })
			.$defaultFn(() => createId())
			.primaryKey(),
	};
}

/**
 * Creates and returns createdAt and updatedAt timestamps.
 */
export function makeCreatedAtAndUpdatedAt() {
	return {
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull(),
	};
}
