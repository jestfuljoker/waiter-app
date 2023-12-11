import { type Request, type Response } from 'express';

import { OrderModel } from '../../models';

export async function changeOrderStatus(req: Request, res: Response): Promise<Response> {
	try {
		const { orderId } = req.params;
		const { status } = req.body;

		if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
			return res.status(400).json({
				error: 'Status should be one of these: WAITING, IN_PRODUCTION or DONE',
			});
		}

		await OrderModel.findByIdAndUpdate(orderId, { status });

		return res.sendStatus(204);
	} catch (error) {
		console.error('An error occurred while changing order status', error);

		return res.sendStatus(500);
	}
}
