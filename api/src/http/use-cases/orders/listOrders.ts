import { type FastifyReply, type FastifyRequest } from 'fastify';

import { OrderModel } from '../../models';

export async function listOrders(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	try {
		const orders = await OrderModel.find().sort({ createdAt: 1 }).populate('products.product');

		return res.json(orders.map((order) => order.toJSON()));
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
}
