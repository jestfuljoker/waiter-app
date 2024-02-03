import { type FastifyInstance } from 'fastify';

import { createCategoryController } from '~/modules/categories/use-cases/create-category';
import { createCategoryJsonSchema } from '~/modules/categories/use-cases/create-category/schema';

export async function categoriesRouter(app: FastifyInstance) {
	// app.get('/', listCategories);
	app.post('/', { schema: createCategoryJsonSchema }, createCategoryController);
	// app.get('/:categoryId/products', listProductsByCategory);
}
