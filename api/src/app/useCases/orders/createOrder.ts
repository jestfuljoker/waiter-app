import { type Request, type Response } from 'express';

import { io } from '../../..';
import { OrderModel } from '../../models';

export async function createOrder(req: Request, res: Response): Promise<Response> {
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
