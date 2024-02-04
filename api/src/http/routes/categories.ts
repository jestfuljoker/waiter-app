import { createCategoryController } from '~/modules/categories/use-cases/create-category';
import { createCategoryJsonSchema } from '~/modules/categories/use-cases/create-category/schema';
import { listCategoriesController } from '~/modules/categories/use-cases/list-categories';
import { listCategoryJsonSchema } from '~/modules/categories/use-cases/list-categories/schema';
import { type FastifyInstanceWithZod } from '~/shared/types/fastify';

export async function categoriesRouter(app: FastifyInstanceWithZod) {
	app.get('/', { schema: listCategoryJsonSchema }, listCategoriesController);
	app.post('/', { schema: createCategoryJsonSchema }, createCategoryController);
	// app.get('/:categoryId/products', listProductsByCategory);
}
