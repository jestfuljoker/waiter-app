import { type Request, type Response } from 'express';

import { ProductModel } from '../../models';

export async function listProducts(req: Request, res: Response): Promise<Response> {
	const products = await ProductModel.find();

	return res.json(products.map((product) => product.toJSON()));
}
