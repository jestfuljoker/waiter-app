import { inject, injectable } from 'tsyringe';

import { ProductsRepository } from '~/modules/products/repositories';
import { BadRequestError } from '~/shared/errors';

import { type CreateProductBody } from './schema';

@injectable()
export class CreateProductUseCase {
	constructor(
		@inject('ProductsRepository') private readonly productsRepository: ProductsRepository,
	) {}

	async handle({ categoryId, description, name, price }: CreateProductBody) {
		const productAlreadyExists = await this.productsRepository.findByName(name);

		if (productAlreadyExists) {
			throw new BadRequestError('Produto já existe');
		}

		const productId = await this.productsRepository.insert({
			categoryId,
			description,
			name,
			price,
			imagePath: '',
		});

		return productId;
	}
}
