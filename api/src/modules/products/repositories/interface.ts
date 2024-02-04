import { type Product, type InsertProduct } from '~/config/db/schemas';

export interface ProductsRepository {
	insert(product: InsertProduct): Promise<string>;
	findByName(name: string): Promise<Product | null>;
}
