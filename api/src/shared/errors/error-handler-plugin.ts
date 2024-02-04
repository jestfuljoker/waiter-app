import { type FastifyReply, type FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { logger } from '~/utils';

import { HttpStatusCodes } from '../types';
import { BaseError } from './base';

export function errorHandlerPlugin(error: unknown, _: FastifyRequest, reply: FastifyReply) {
	logger.error(error, "Houston we've got a problem");

	if (error instanceof BaseError) {
		return reply
			.status(error.statusCode)
			.send({ code: error.name, message: error.message, errors: [] });
	}

	if (error instanceof ZodError) {
		return reply.status(HttpStatusCodes.BAD_REQUEST).send({
			code: 'BAD_REQUEST',
			message:
				'Ops, parece que algo deu errado com os dados que você forneceu. Por favor, verifique os dados e tente novamente.',
			errors: error.issues.map((issue) => {
				return {
					path: issue.path,
					message: issue.message,
				};
			}),
		});
	}

	return reply.status(HttpStatusCodes.INTERNAL_ERROR).send({
		code: 'INTERNAL_SERVER_ERROR',
		message: 'Houston, we got a problem!',
		errors: [],
	});
}
