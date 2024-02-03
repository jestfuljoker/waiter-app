import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ProductModel } from '../../models';

export async function listProductsByCategory(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	try {
		const { categoryId } = req.params;

		const products = await ProductModel.find().where('category').equals(categoryId);

		return res.json(products.map((product) => product.toJSON()));
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
}
