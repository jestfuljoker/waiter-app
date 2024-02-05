import { faker } from '@faker-js/faker';

import { type InsertProduct } from '~/config/db/schemas';
import { InMemoryCategoryRepository } from '~/modules/categories/repositories';
import { InMemoryProductsRepository } from '~/modules/products/repositories';
import { createCategories, createProducts, makeProducts } from '~/test/utils';
import { ROWS_PER_PAGE } from '~/utils';

import { ListProductsUseCase } from './use-case';

let productsRepository: InMemoryProductsRepository;

function makeSut() {
	const sut = new ListProductsUseCase(productsRepository);

	return { sut };
}

describe('ListProductsUseCase', () => {
	beforeEach(() => {
		productsRepository = new InMemoryProductsRepository();
	});

	it('should be able to list products', async () => {
		const { sut } = makeSut();

		await createProducts(productsRepository);

		const products = await sut.handle({ page: 1, limit: ROWS_PER_PAGE });

		expect(products.count).toBeDefined();
		expect(products.pages).toBeDefined();
		expect(products.items).toHaveLength(ROWS_PER_PAGE);
	});

	it('should be able to list paginated products', async () => {
		const totalItems = 50;
		const totalPages = Math.ceil(totalItems / ROWS_PER_PAGE);

		const { sut } = makeSut();

		await createProducts(productsRepository, totalItems);

		const firstPageProducts = await sut.handle({ page: 1, limit: ROWS_PER_PAGE });

		expect(firstPageProducts.count).toBe(totalItems);
		expect(firstPageProducts.pages).toBe(totalPages);
		expect(firstPageProducts.items).toHaveLength(ROWS_PER_PAGE);

		const secondPageProducts = await sut.handle({ page: 2, limit: ROWS_PER_PAGE });

		expect(secondPageProducts.count).toBeUndefined();
		expect(secondPageProducts.pages).toBeUndefined();
		expect(secondPageProducts.items).toHaveLength(ROWS_PER_PAGE);
	});

	it('should be able to list paginated products with filter', async () => {
		const totalItems = 4;
		const totalPages = Math.ceil(totalItems / ROWS_PER_PAGE);

		const { sut } = makeSut();

		const productsToCreate = makeProducts();

		await createProducts(productsRepository, ROWS_PER_PAGE, productsToCreate);

		const firstPageProducts = await sut.handle({
			page: 1,
			limit: ROWS_PER_PAGE,
			name: 'Product',
		});

		expect(firstPageProducts.count).toBe(totalItems);
		expect(firstPageProducts.pages).toBe(totalPages);
		expect(firstPageProducts.items).toHaveLength(totalItems);
	});

	it('should be able to list paginated products with categories', async () => {
		const { sut } = makeSut();

		const categoriesRepository = new InMemoryCategoryRepository();

		const categoriesIds = await createCategories(categoriesRepository);

		const productsToCreate: InsertProduct[] = Array.from({ length: ROWS_PER_PAGE }, (_, index) => ({
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			imagePath: faker.internet.url(),
			categoryId: categoriesIds[index],
		}));

		await createProducts(productsRepository, ROWS_PER_PAGE, productsToCreate);

		const productsWithCategories = await sut.handle({ page: 1, limit: ROWS_PER_PAGE });

		for (const [index, productWithCategory] of productsWithCategories.items.entries()) {
			expect(productWithCategory.category).toBeDefined();
			expect(productWithCategory.category?.id).toBe(categoriesIds[index]);
		}
	});
});
