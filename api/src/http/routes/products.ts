import { type FastifyInstance } from 'fastify';

import { createProductController } from '~/modules/products/use-cases/create-product';
import { createProductJsonSchema } from '~/modules/products/use-cases/create-product/schema';

export async function productRouter(app: FastifyInstance) {
	app.post('/', { schema: createProductJsonSchema }, createProductController);
}
