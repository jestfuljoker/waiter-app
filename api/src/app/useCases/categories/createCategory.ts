import { Request, Response } from 'express';

import { Category } from '../../models';

export async function createCategory(req: Request, res: Response): Promise<Response> {
	try {
		const { name, icon } = req.body;

		const category = await Category.create({
			name,
			icon,
		});

		return res.status(201).json(category);
	} catch (error) {
		console.error('An error occurred while creating a category', error);
		return res.sendStatus(500);
	}
}
