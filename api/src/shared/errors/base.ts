import { type HttpStatusCodes } from '../types';

export abstract class BaseError extends Error {
	statusCode: HttpStatusCodes;

	constructor(message: string, statusCode: HttpStatusCodes) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
	}
}
