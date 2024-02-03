import { faker } from '@faker-js/faker';

import { InMemoryCategoryRepository } from '~/modules/categories/repositories';

import { CreateCategoryUseCase } from './use-case';

function makeSut() {
	const categoryRepository = new InMemoryCategoryRepository();
	const sut = new CreateCategoryUseCase(categoryRepository);

	return { sut };
}

describe('CreateCategoryUseCase', () => {
	it('should be able to create a new category', async () => {
		const { sut } = makeSut();

		const categoryId = await sut.handle({
			icon: faker.internet.emoji(),
			name: faker.lorem.word(),
		});

		expect(categoryId).toBeDefined();
	});

	it('should throw if category already exists', async () => {
		const { sut } = makeSut();

		const categoryName = faker.lorem.word();

		await sut.handle({
			icon: faker.internet.emoji(),
			name: categoryName,
		});

		const promise = sut.handle({
			icon: faker.internet.emoji(),
			name: categoryName,
		});

		await expect(promise).rejects.toThrowError('Category already exists');
	});
});
