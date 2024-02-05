import { faker } from '@faker-js/faker';

import { type InsertProduct } from '~/config/db/schemas';
import { type ProductsRepository } from '~/modules/products/repositories';
import { ROWS_PER_PAGE } from '~/utils';

export function makeProducts(categoryIds: string[] = []): InsertProduct[] {
	return [
		{
			name: 'Product 1',
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			imagePath: faker.internet.url(),
			categoryId: categoryIds[0] || null,
		},
		{
			name: 'Próduct 2',
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			imagePath: faker.internet.url(),
			categoryId: categoryIds[1] || null,
		},
		{
			name: 'product 3',
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			imagePath: faker.internet.url(),
			categoryId: categoryIds[2] || null,
		},
		{
			name: 'some product',
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			imagePath: faker.internet.url(),
			categoryId: categoryIds[3] || null,
		},
	];
}

export async function createProducts(
	productsRepository: ProductsRepository,
	limit = ROWS_PER_PAGE,
	products: InsertProduct[] = [],
) {
	await Promise.all([
		...products.map((product) => productsRepository.insert(product)),
		...Array.from({ length: limit - products.length }, () =>
			productsRepository.insert({
				name: faker.commerce.productName(),
				description: faker.commerce.productDescription(),
				price: faker.commerce.price(),
				imagePath: faker.internet.url(),
			}),
		),
	]);
}
