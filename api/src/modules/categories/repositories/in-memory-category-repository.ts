import { createId } from '@paralleldrive/cuid2';

import { type Category, type InsertCategory } from '~/config/db/schemas';
import { type PaginatedRequest } from '~/shared/types';
import { normalizeString } from '~/utils';

import { type ListCategoriesFilters } from '../use-cases/list-categories/use-case';
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
		const category = this.categories.find((category) =>
			normalizeString(category.name).includes(name),
		);

		return category || null;
	}

	async findAll(payload: PaginatedRequest & ListCategoriesFilters): Promise<Category[]> {
		let categories = this.categories;

		if (payload.name) {
			categories = categories.filter((category) =>
				normalizeString(category.name).includes(normalizeString(payload.name!)),
			);
		}

		return categories.slice((payload.page - 1) * payload.limit, payload.page * payload.limit);
	}

	async count(name?: string): Promise<number> {
		return name
			? this.categories.filter((category) =>
					normalizeString(category.name).includes(normalizeString(name)),
			  ).length
			: this.categories.length;
	}
}
