import { Request, Response } from 'express';
import { Category } from '../../app/models';

export async function listCategories(req: Request, res: Response): Promise<Response> {
	const categories = await Category.find();

	return res.json(categories);
}
