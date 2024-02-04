import { type FastifyRequest, type FastifyReply } from 'fastify';
import { container } from 'tsyringe';

import { HttpStatusCodes } from '~/shared/types';

import { type ListCategoryQueryString } from './schema';
import { ListCategoriesUseCase } from './use-case';

export async function listCategoriesController(
	request: FastifyRequest<{ Querystring: ListCategoryQueryString }>,
	reply: FastifyReply,
): Promise<FastifyReply> {
	const params = request.query;

	const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

	const categories = await listCategoriesUseCase.handle(params);

	return reply.status(HttpStatusCodes.SUCCESS).send(categories);
}
