import { type FastifyReply, type FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { type CreateCategoryBody } from './schema';
import { CreateCategoryUseCase } from './use-case';

export async function createCategoryController(
	request: FastifyRequest<{ Body: CreateCategoryBody }>,
	reply: FastifyReply,
): Promise<FastifyReply> {
	const body = request.body;

	const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

	const categoryId = await createCategoryUseCase.handle(body);

	return reply.status(201).send({
		...body,
		id: categoryId,
	});
}
