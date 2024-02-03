import { type FastifyInstance } from 'fastify';

import { categoriesRouter } from './categories';
// import { orderRouter } from './orders';
// import { productRouter } from './products';

export async function router(app: FastifyInstance) {
	app.register(categoriesRouter, { prefix: '/categories' });
	// app.register(orderRouter, { prefix: '/orders' });
	// app.register(productRouter, { prefix: '/products' });
}
