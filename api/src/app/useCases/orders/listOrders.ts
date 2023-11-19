import { Request, Response } from 'express';

import { Order } from '../../models';

export async function listOrders(req: Request, res: Response): Promise<Response> {
	try {
		const orders = await Order.find().sort({ createdAt: 1 }).populate('products.product');

		return res.json(orders);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
}
