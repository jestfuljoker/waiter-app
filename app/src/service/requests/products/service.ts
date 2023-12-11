import { env } from '~/config/env';

import HttpClient from '../../client';
import { type Product } from './types';

export class ProductsService {
	private static httpClient: HttpClient = new HttpClient(env.apiUrl);

	private constructor() {}

	static async listProducts(options?: RequestInit): Promise<Product[]> {
		const products = await this.httpClient.get<Product[]>('/products', options);

		return products;
	}

	static async listProductsByCategoryId(
		categoryId: string,
		options?: RequestInit,
	): Promise<Product[]> {
		const products = await this.httpClient.get<Product[]>(
			`/categories/${categoryId}/products`,
			options,
		);

		return products;
	}
}
