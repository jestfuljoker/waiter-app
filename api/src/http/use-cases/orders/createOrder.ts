import { type FastifyReply, type FastifyRequest } from 'fastify';

import { io } from '../..';
import { OrderModel } from '../../models';

export async function createOrder(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	try {
		const { table, products } = req.body;

		const order = await OrderModel.create({ products, table });
		const orderDetails = await order.populate('products.product');

		io.emit('orders@new', orderDetails);

		return res.status(201).json(order.toJSON());
	} catch (error) {
		console.error('An error occurred while creating a order', error);

		return res.sendStatus(500);
	}
}
