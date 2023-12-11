import { type Product } from '../products/types';

export enum OrderStatus {
	WAITING = 'WAITING',
	IN_PRODUCTION = 'IN_PRODUCTION',
	DONE = 'DONE',
}

export interface Order {
	id: string;
	table: string;
	status: OrderStatus;
	createdAt: string;
	products: {
		id: string;
		quantity: number;
		product: Product;
	}[];
}
