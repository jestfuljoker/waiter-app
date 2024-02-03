import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ProductModel } from '../../models';

export async function createProduct(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	try {
		const imagePath = req.file?.filename;
		const { name, description, price, category, ingredients } = req.body;

		const product = await ProductModel.create({
			name,
			price: Number(price),
			category,
			imagePath,
			description,
			ingredients: ingredients ? JSON.parse(ingredients) : [],
		});

		return res.status(201).json(product.toJSON());
	} catch (error) {
		console.error('An error occurred while creating a product', error);

		return res.sendStatus(500);
	}
}
