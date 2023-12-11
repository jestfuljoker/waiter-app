import { env } from '~/config/env';

import HttpClient from '../../client';
import type { CreateOrderPayload } from './types';

export class OrdersService {
	private static httpClient: HttpClient = new HttpClient(env.apiUrl);

	private constructor() {}

	static async createOrder(payload: CreateOrderPayload, options?: RequestInit): Promise<void> {
		await this.httpClient.post<CreateOrderPayload>('/orders', {
			...options,
			body: payload,
		});
	}
}
