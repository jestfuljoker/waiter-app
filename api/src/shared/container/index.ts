import { container } from 'tsyringe';

import {
	DrizzleCategoryRepository,
	type CategoryRepository,
} from '~/modules/categories/repositories';
import {
	DrizzleProductsRepository,
	type ProductsRepository,
} from '~/modules/products/repositories';

container.registerSingleton<CategoryRepository>('CategoryRepository', DrizzleCategoryRepository);
container.registerSingleton<ProductsRepository>('ProductsRepository', DrizzleProductsRepository);
