import { type Request, type Response } from 'express';

import { OrderModel } from '../../models';

export async function listOrders(req: Request, res: Response): Promise<Response> {
	try {
		const orders = await OrderModel.find().sort({ createdAt: 1 }).populate('products.product');

		return res.json(orders.map((order) => order.toJSON()));
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
}
