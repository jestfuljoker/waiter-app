import { type FastifyInstance } from 'fastify';

import { cancelOrder, changeOrderStatus, createOrder, listOrders } from '~/http/use-cases/orders';

export async function orderRouter(app: FastifyInstance) {
	app.get('/', listOrders);
	app.post('/', createOrder);
	app.patch('/:orderId', changeOrderStatus);
	app.delete('/:orderId', cancelOrder);
}
