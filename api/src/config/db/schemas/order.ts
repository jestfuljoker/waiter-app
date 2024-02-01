import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';

import { makeCreatedAtAndUpdatedAt, makeId } from './common';

export enum OrderStatus {
	WAITING = 'WAITING',
	IN_PRODUCTION = 'IN_PRODUCTION',
	DONE = 'DONE',
}

export const orderStatusEnum = pgEnum('orderStatus', [
	OrderStatus.WAITING,
	OrderStatus.IN_PRODUCTION,
	OrderStatus.DONE,
]);

export const orders = pgTable('order', {
	...makeId(),

	table: varchar('table', { length: 255 }).notNull(),
	status: orderStatusEnum('status').default(OrderStatus.WAITING).notNull(),

	...makeCreatedAtAndUpdatedAt(),
});

export type InsertOrder = InferInsertModel<typeof orders>;

export type UpdateOrder = Omit<Partial<InsertOrder>, 'id'>;

export type Order = InferSelectModel<typeof orders>;
