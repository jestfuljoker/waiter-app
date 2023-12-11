interface ApiErrorErrorContext {
	error: string;
}

export class ApiError extends Error {
	response: Response;

	body: ApiErrorErrorContext;

	constructor(response: Response, body: ApiErrorErrorContext) {
		console.log('response', response);
		console.log('body', body);
		super();

		this.name = 'ApiError';
		this.response = response;
		this.message = body?.error || `${response.status} - ${response.statusText}`;
	}
}
