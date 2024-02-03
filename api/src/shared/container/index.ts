import { container } from 'tsyringe';

import {
	DrizzleCategoryRepository,
	type CategoryRepository,
} from '~/modules/categories/repositories';

container.registerSingleton<CategoryRepository>('CategoryRepository', DrizzleCategoryRepository);
