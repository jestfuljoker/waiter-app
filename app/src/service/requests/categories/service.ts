import { env } from '~/config/env';

import HttpClient from '../../client';
import { type Category } from './types';

export class CategoriesService {
	private static httpClient: HttpClient = new HttpClient(env.apiUrl);

	private constructor() {}

	static async listCategories(options?: RequestInit): Promise<Category[]> {
		const categories = await this.httpClient.get<Category[]>('/categories', options);
		console.log(categories);

		return categories;
	}
}
