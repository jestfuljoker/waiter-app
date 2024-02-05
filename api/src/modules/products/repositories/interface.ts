import { type ProductWithCategory, type InsertProduct, type Product } from '~/config/db/schemas';
import { type ListProductsFilters } from '~/modules/products/use-cases/list-products/use-case';
import { type PaginatedRequest } from '~/shared/types';

export interface ProductsRepository {
	insert(product: InsertProduct): Promise<string>;
	findByName(name: string): Promise<Product | null>;
	findAll(payload: ListProductsFilters & PaginatedRequest): Promise<ProductWithCategory[]>;
	count(name?: string): Promise<number>;
}
