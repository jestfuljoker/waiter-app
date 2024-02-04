import { type FastifyBaseLogger, type FastifyInstance, type RawServerDefault } from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';
import { type ServerResponse, type IncomingMessage } from 'http';

export type FastifyInstanceWithZod = FastifyInstance<
	RawServerDefault,
	IncomingMessage,
	ServerResponse<IncomingMessage>,
	FastifyBaseLogger,
	ZodTypeProvider
>;

export enum HttpStatusCodes {
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	RESOURCE_NOT_FOUND = 404,
	INTERNAL_ERROR = 500,
	SUCCESS = 200,
	CREATED = 201,
	NO_CONTENT = 204,
}
