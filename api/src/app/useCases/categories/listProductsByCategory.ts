import { Request, Response } from 'express';
import { Product } from '../../models';

export async function listProductsByCategory(req: Request, res: Response): Promise<Response> {
	try {
		const { categoryId } = req.params;

		const products = await Product.find().where('category').equals(categoryId);

		return res.json(products);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
}
