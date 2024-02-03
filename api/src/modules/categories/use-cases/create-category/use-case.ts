import { inject, injectable } from 'tsyringe';

import { type InsertCategory } from '~/config/db/schemas';
import { type CategoryRepository } from '~/modules/categories/repositories';
import { BadRequestError } from '~/shared/errors';

@injectable()
export class CreateCategoryUseCase {
	constructor(
		@inject('CategoryRepository') private readonly categoryRepository: CategoryRepository,
	) {}

	async handle({ icon, name }: InsertCategory) {
		const categoryAlreadyExists = await this.categoryRepository.findByName(name);

		if (categoryAlreadyExists) {
			throw new BadRequestError('Category already exists');
		}

		const categoryId = await this.categoryRepository.insert({
			icon,
			name,
		});

		return categoryId;
	}
}
