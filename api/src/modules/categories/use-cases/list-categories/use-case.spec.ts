import { faker } from '@faker-js/faker';

import { type InsertCategory } from '~/config/db/schemas';

import { InMemoryCategoryRepository } from '../../repositories';
import { ListCategoriesUseCase } from './use-case';

let categoriesRepository: InMemoryCategoryRepository;
const LIMIT = 25;

async function createCategories(limit = LIMIT, categories: InsertCategory[] = []) {
	await Promise.all([
		...categories.map((category) => categoriesRepository.insert(category)),
		...Array.from({ length: limit - categories.length }, () =>
			categoriesRepository.insert({
				icon: faker.internet.emoji(),
				name: faker.lorem.word(),
			}),
		),
	]);
}

function makeSut() {
	const sut = new ListCategoriesUseCase(categoriesRepository);

	return { sut };
}

function makeCategories(): InsertCategory[] {
	return [
		{
			name: 'Category 1',
			icon: faker.internet.emoji(),
		},
		{
			name: 'Catégory 2',
			icon: faker.internet.emoji(),
		},
		{
			name: 'category 3',
			icon: faker.internet.emoji(),
		},
		{
			name: 'some category',
			icon: faker.internet.emoji(),
		},
	];
}

describe('ListCategoriesUseCase', () => {
	beforeEach(() => {
		categoriesRepository = new InMemoryCategoryRepository();
	});

	it('should be able to list categories', async () => {
		const { sut } = makeSut();

		await createCategories();

		const categories = await sut.handle({ page: 1, limit: LIMIT });

		expect(categories.count).toBeDefined();
		expect(categories.pages).toBeDefined();
		expect(categories.items).toHaveLength(LIMIT);
	});

	it('should be able to list paginated categories', async () => {
		const totalItems = 50;
		const totalPages = Math.ceil(totalItems / LIMIT);

		const { sut } = makeSut();

		await createCategories(totalItems);

		const firstPageCategories = await sut.handle({ page: 1, limit: LIMIT });

		expect(firstPageCategories.count).toBe(totalItems);
		expect(firstPageCategories.pages).toBe(totalPages);
		expect(firstPageCategories.items).toHaveLength(LIMIT);

		const secondPageCategories = await sut.handle({ page: 2, limit: LIMIT });

		expect(secondPageCategories.count).not.toBeDefined();
		expect(secondPageCategories.pages).not.toBeDefined();
		expect(secondPageCategories.items).toHaveLength(LIMIT);
	});

	it('should be able to list paginated categories with filter', async () => {
		const { sut } = makeSut();
		const totalItems = 4;
		const totalPages = Math.ceil(totalItems / LIMIT);

		const categoriesToCreate = makeCategories();

		await createCategories(LIMIT, categoriesToCreate);

		const firstPageCategories = await sut.handle({ page: 1, limit: LIMIT, name: 'Category' });

		expect(firstPageCategories.count).toBe(totalItems);
		expect(firstPageCategories.pages).toBe(totalPages);
		expect(firstPageCategories.items).toHaveLength(totalItems);
	});
});
