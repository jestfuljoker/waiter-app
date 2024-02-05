import { inject, injectable } from 'tsyringe';

import { type ProductWithCategory } from '~/config/db/schemas';
import { type ProductsRepository } from '~/modules/products/repositories';
import { type PaginatedRequest, type PaginatedResponse } from '~/shared/types';

export interface ListProductsFilters {
	name?: string;
}

@injectable()
export class ListProductsUseCase {
	constructor(
		@inject('ProductRepository') private readonly productRepository: ProductsRepository,
	) {}

	async handle({
		limit,
		page,
		name,
	}: PaginatedRequest<ListProductsFilters>): Promise<PaginatedResponse<ProductWithCategory>> {
		const products = await this.productRepository.findAll({
			limit,
			page,
			name,
		});

		if (page === 1) {
			const count = await this.productRepository.count(name);

			return {
				count,
				pages: Math.ceil(count / limit),
				items: products,
			};
		}

		return {
			items: products,
		};
	}
}
