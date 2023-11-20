import { Request, Response } from 'express';

import { ProductModel } from '../../models';

export async function listProductsByCategory(req: Request, res: Response): Promise<Response> {
	try {
		const { categoryId } = req.params;

		const products = await ProductModel.find().where('category').equals(categoryId);

		return res.json(products.map((product) => product.toJSON()));
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
}
