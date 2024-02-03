import { BaseError } from './base';
import { HttpErrorCodes } from './error-codes';

export class BadRequestError extends BaseError {
	constructor(message: string) {
		super(message, HttpErrorCodes.BAD_REQUEST);
		this.name = this.constructor.name;
	}
}
