import { type Request, type Response } from 'express';

import { CategoryModel } from '../../models';

export async function listCategories(req: Request, res: Response): Promise<Response> {
	try {
		const categories = await CategoryModel.find();

		return res.json(categories.map((category) => category.toJSON()));
	} catch (error) {
		return res.sendStatus(500);
	}
}
