import HttpClient from '../../client';
import type { CreateOrderPayload } from './types';

export class OrdersService {
	private static httpClient: HttpClient = new HttpClient('http://192.168.0.20:3001');

	private constructor() {}

	static async createOrder(payload: CreateOrderPayload, options?: RequestInit): Promise<void> {
		await this.httpClient.post<CreateOrderPayload>('/orders', {
			...options,
			body: payload,
		});
	}
}
