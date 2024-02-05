import { faker } from '@faker-js/faker';

import { type InsertCategory } from '~/config/db/schemas';
import { type CategoryRepository } from '~/modules/categories/repositories';
import { ROWS_PER_PAGE } from '~/utils';

export async function createCategories(
	categoriesRepository: CategoryRepository,
	limit = ROWS_PER_PAGE,
	categories: InsertCategory[] = [],
) {
	return Promise.all([
		...categories.map((category) => categoriesRepository.insert(category)),
		...Array.from({ length: limit - categories.length }, () =>
			categoriesRepository.insert({
				icon: faker.internet.emoji(),
				name: faker.lorem.word(),
			}),
		),
	]);
}

export function makeCategories(): InsertCategory[] {
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
