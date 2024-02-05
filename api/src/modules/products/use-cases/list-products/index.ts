import { type FastifyRequest, type FastifyReply } from 'fastify';
import { container } from 'tsyringe';

import { HttpStatusCodes } from '~/shared/types';

import { type ListProductQueryString } from './schema';
import { ListProductsUseCase } from './use-case';

export async function listProductsController(
	request: FastifyRequest<{ Querystring: ListProductQueryString }>,
	reply: FastifyReply,
): Promise<FastifyReply> {
	const params = request.query;

	const listProductsUseCase = container.resolve(ListProductsUseCase);

	const productWithCategory = await listProductsUseCase.handle(params);

	return reply.status(HttpStatusCodes.SUCCESS).send(productWithCategory);
}
