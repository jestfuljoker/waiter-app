import { Request, Response } from 'express';
import { Product } from '../../app/models';

export async function listProducts(req: Request, res: Response): Promise<Response> {
	const products = await Product.find();

	return res.json(products);
}
