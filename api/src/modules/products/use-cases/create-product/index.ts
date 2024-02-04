import { type FastifyReply, type FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { HttpStatusCodes } from '~/shared/types';

import { type CreateProductBody } from './schema';
import { CreateProductUseCase } from './use-case';

export async function createProductController(
	request: FastifyRequest<{ Body: CreateProductBody }>,
	reply: FastifyReply,
): Promise<FastifyReply> {
	const body = request.body;

	const createProductUseCase = container.resolve(CreateProductUseCase);

	const productId = await createProductUseCase.handle(body);

	return reply.status(HttpStatusCodes.CREATED).send({
		...body,
		id: productId,
	});
}
