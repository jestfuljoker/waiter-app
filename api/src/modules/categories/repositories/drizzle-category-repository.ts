import { sql } from 'drizzle-orm';

import { db } from '~/config/db/connection';
import { categories, type Category, type InsertCategory } from '~/config/db/schemas';
import { type PaginatedRequest } from '~/shared/types';
import { normalizeString } from '~/utils';

import { type ListCategoriesFilters } from '../use-cases/list-categories/use-case';
import { type CategoryRepository } from './interface';

export class DrizzleCategoryRepository implements CategoryRepository {
	private normalizedNameWhere(name: string) {
		return sql<string>`unaccent(${categories.name}) ILIKE '%' || ${normalizeString(name)} || '%'`;
	}

	async insert(category: InsertCategory): Promise<string> {
		const newCategory = await db.insert(categories).values(category).returning({
			id: categories.id,
		});

		return newCategory[0].id;
	}

	async findByName(name: string): Promise<Category | null> {
		const [category] = await db.select().from(categories).where(this.normalizedNameWhere(name));

		return category || null;
	}

	async findAll({
		limit,
		page,
		name,
	}: PaginatedRequest & ListCategoriesFilters): Promise<Category[]> {
		const categoriesListQuery = db
			.select()
			.from(categories)
			.offset((page - 1) * limit)
			.limit(limit);

		if (name) {
			categoriesListQuery.where(this.normalizedNameWhere(name));
		}

		const categoriesList = await categoriesListQuery;

		return categoriesList;
	}

	async count(name?: string): Promise<number> {
		const countQuery = db.select({ count: sql<number>`count(${categories.id})` }).from(categories);

		if (name) {
			countQuery.where(this.normalizedNameWhere(name));
		}

		const [{ count }] = await countQuery;

		return Number(count);
	}
}
