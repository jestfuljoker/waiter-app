import { HttpStatusCodes } from '../types';
import { BaseError } from './base';

export class BadRequestError extends BaseError {
	constructor(message: string) {
		super(message, HttpStatusCodes.BAD_REQUEST);
		this.name = this.constructor.name;
	}
}
