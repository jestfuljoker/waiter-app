import { type FastifyInstanceWithZod } from '~/shared/types/fastify';

import { categoriesRouter } from './categories';
// import { orderRouter } from './orders';
// import { productRouter } from './products';

export async function router(app: FastifyInstanceWithZod) {
	app.register(categoriesRouter, { prefix: '/categories' });
	// app.register(orderRouter, { prefix: '/orders' });
	// app.register(productRouter, { prefix: '/products' });
}
