import { type FastifyReply, type FastifyRequest } from 'fastify';

import { ProductModel } from '../../models';

export async function listProducts(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	const products = await ProductModel.find();

	return res.json(products.map((product) => product.toJSON()));
}
