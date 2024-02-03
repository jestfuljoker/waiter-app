import { createId } from '@paralleldrive/cuid2';

import { type Category, type InsertCategory } from '~/config/db/schemas';

import { type CategoryRepository } from './interface';

export class InMemoryCategoryRepository implements CategoryRepository {
	private categories: Category[] = [];

	async insert(category: InsertCategory): Promise<string> {
		const newCategory: Category = {
			...category,
			id: createId(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.categories.push(newCategory);

		return newCategory.id;
	}

	async findByName(name: string): Promise<Category | null> {
		const category = this.categories.find((category) => category.name === name);

		return category || null;
	}
}
