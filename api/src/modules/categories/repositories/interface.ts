import { type Category, type InsertCategory } from '~/config/db/schemas';

export interface CategoryRepository {
	insert(category: InsertCategory): Promise<string>;
	findByName(name: string): Promise<Category | null>;
}
