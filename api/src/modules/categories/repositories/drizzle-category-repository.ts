import { db } from '~/config/db/connection';
import { categories, type InsertCategory } from '~/config/db/schemas';

import { type CategoryRepository } from './interface';

export class DrizzleCategoryRepository implements CategoryRepository {
	async insert(category: InsertCategory): Promise<string> {
		const newCategory = await db.insert(categories).values(category).returning({
			id: categories.id,
		});

		return newCategory[0].id;
	}
}
