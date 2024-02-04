import { type Category, type InsertCategory } from '~/config/db/schemas';
import { type PaginatedRequest } from '~/shared/types';

import { type ListCategoriesFilters } from '../use-cases/list-categories/use-case';

export interface CategoryRepository {
	insert(category: InsertCategory): Promise<string>;
	findByName(name: string): Promise<Category | null>;
	findAll(payload: PaginatedRequest & ListCategoriesFilters): Promise<Category[]>;
	count(name?: string): Promise<number>;
}
