import { type FastifyReply, type FastifyRequest } from 'fastify';

import { OrderModel } from '../../models';

export async function cancelOrder(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	try {
		const { orderId } = req.params;

		await OrderModel.findByIdAndDelete(orderId);

		return res.sendStatus(204);
	} catch (error) {
		console.error('An error occurred while canceling a order', error);

		return res.sendStatus(500);
	}
}
