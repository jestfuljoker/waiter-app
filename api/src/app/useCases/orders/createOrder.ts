import { Request, Response } from 'express';

import { Order } from '../../models';

export async function createOrder(req: Request, res: Response): Promise<Response> {
	try {
		const { table, products } = req.body;

		const order = await Order.create({ products, table });

		return res.status(201).json(order);
	} catch (error) {
		console.error('An error occurred while creating a order', error);

		return res.sendStatus(500);
	}
}
