import { type FastifyRequest, type FastifyReply } from 'fastify';

export async function listCategories(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	try {
		const categories = await CategoryModel.find();

		return res.json(categories.map((category) => category.toJSON()));
	} catch (error) {
		return res.sendStatus(500);
	}
}
