import { env } from '~/config/env';

import { type Order, type OrderStatus } from '.';
import HttpClient from '../../client';

export class OrdersService {
	private static httpClient: HttpClient = new HttpClient(env.apiUrl);

	private constructor() {}

	static async listOrders(options?: RequestInit): Promise<Order[]> {
		const orders = await this.httpClient.get<Order[]>('/orders', options);

		return orders;
	}

	static async cancelOrder(id: string, options?: RequestInit): Promise<void> {
		await this.httpClient.delete(`/orders/${id}`, options);
	}

	static async changeOrderStatus(
		id: string,
		status: OrderStatus,
		options?: RequestInit,
	): Promise<void> {
		await this.httpClient.put(`/orders/${id}`, {
			...options,
			body: {
				status,
			},
		});
	}
}
