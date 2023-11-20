import { Request, Response } from 'express';

import { CategoryModel } from '../../models';

export async function createCategory(req: Request, res: Response): Promise<Response> {
	try {
		const { name, icon } = req.body;

		const category = await CategoryModel.create({
			name,
			icon,
		});

		return res.status(201).json(category.toJSON());
	} catch (error) {
		console.error('An error occurred while creating a category', error);
		return res.sendStatus(500);
	}
}
