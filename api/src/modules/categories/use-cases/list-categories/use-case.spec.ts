import { createCategories, makeCategories } from '~/test/utils';
import { ROWS_PER_PAGE } from '~/utils';

import { InMemoryCategoryRepository } from '../../repositories';
import { ListCategoriesUseCase } from './use-case';

let categoriesRepository: InMemoryCategoryRepository;

function makeSut() {
	const sut = new ListCategoriesUseCase(categoriesRepository);

	return { sut };
}

describe('ListCategoriesUseCase', () => {
	beforeEach(() => {
		categoriesRepository = new InMemoryCategoryRepository();
	});

	it('should be able to list categories', async () => {
		const { sut } = makeSut();

		await createCategories(categoriesRepository);

		const categories = await sut.handle({ page: 1, limit: ROWS_PER_PAGE });

		expect(categories.count).toBeDefined();
		expect(categories.pages).toBeDefined();
		expect(categories.items).toHaveLength(ROWS_PER_PAGE);
	});

	it('should be able to list paginated categories', async () => {
		const totalItems = 50;
		const totalPages = Math.ceil(totalItems / ROWS_PER_PAGE);

		const { sut } = makeSut();

		await createCategories(categoriesRepository, totalItems);

		const firstPageCategories = await sut.handle({ page: 1, limit: ROWS_PER_PAGE });

		expect(firstPageCategories.count).toBe(totalItems);
		expect(firstPageCategories.pages).toBe(totalPages);
		expect(firstPageCategories.items).toHaveLength(ROWS_PER_PAGE);

		const secondPageCategories = await sut.handle({ page: 2, limit: ROWS_PER_PAGE });

		expect(secondPageCategories.count).not.toBeDefined();
		expect(secondPageCategories.pages).not.toBeDefined();
		expect(secondPageCategories.items).toHaveLength(ROWS_PER_PAGE);
	});

	it('should be able to list paginated categories with filter', async () => {
		const { sut } = makeSut();
		const totalItems = 4;
		const totalPages = Math.ceil(totalItems / ROWS_PER_PAGE);

		const categoriesToCreate = makeCategories();

		await createCategories(categoriesRepository, ROWS_PER_PAGE, categoriesToCreate);

		const firstPageCategories = await sut.handle({
			page: 1,
			limit: ROWS_PER_PAGE,
			name: 'Category',
		});

		expect(firstPageCategories.count).toBe(totalItems);
		expect(firstPageCategories.pages).toBe(totalPages);
		expect(firstPageCategories.items).toHaveLength(totalItems);
	});
});
