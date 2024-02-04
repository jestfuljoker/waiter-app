import { inject, injectable } from 'tsyringe';

import { type Category } from '~/config/db/schemas';
import { type CategoryRepository } from '~/modules/categories/repositories';
import { type PaginatedRequest, type PaginatedResponse } from '~/shared/types';

export interface ListCategoriesFilters {
	name?: string;
}

@injectable()
export class ListCategoriesUseCase {
	constructor(
		@inject('CategoryRepository') private readonly categoryRepository: CategoryRepository,
	) {}

	async handle({
		limit,
		page,
		name,
	}: PaginatedRequest<ListCategoriesFilters>): Promise<PaginatedResponse<Category>> {
		const categories = await this.categoryRepository.findAll({
			limit,
			page,
			name,
		});

		if (page === 1) {
			const count = await this.categoryRepository.count(name);

			return {
				count,
				pages: Math.ceil(count / limit),
				items: categories,
			};
		}

		return {
			items: categories,
		};
	}
}
