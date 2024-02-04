import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

import { type InsertProduct } from '~/config/db/schemas';
import { InMemoryProductsRepository } from '~/modules/products/repositories';

import { CreateProductUseCase } from './use-case';

let productsRepository: InMemoryProductsRepository;

function makeSut() {
	const sut = new CreateProductUseCase(productsRepository);

	return {
		sut,
	};
}

describe('CreateProductUseCase', () => {
	beforeEach(() => {
		productsRepository = new InMemoryProductsRepository();
	});

	it('should be able to create a new product', async () => {
		const { sut } = makeSut();

		const productId = await sut.handle({
			categoryId: createId(),
			description: faker.commerce.productDescription(),
			name: faker.commerce.productName(),
			price: faker.commerce.price(),
		});

		expect(productId).toBeDefined();
	});

	it('should throw if product already exists', async () => {
		const { sut } = makeSut();

		const product: InsertProduct = {
			categoryId: createId(),
			description: faker.commerce.productDescription(),
			name: faker.commerce.productName(),
			price: faker.commerce.price(),
			imagePath: faker.internet.url(),
		};

		await sut.handle(product);

		const promise = sut.handle(product);

		await expect(promise).rejects.toThrowError('Produto já existe');
	});
});
