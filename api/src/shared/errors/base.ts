import { type HttpErrorCodes } from './error-codes';

export abstract class BaseError extends Error {
	code: HttpErrorCodes;
	constructor(message: string, statusCode: HttpErrorCodes) {
		super(message);
		this.name = this.constructor.name;
		this.code = statusCode;
	}
}
