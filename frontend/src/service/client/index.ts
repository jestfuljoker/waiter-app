/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from '../error';

type RequestOptions = Omit<RequestInit, 'body'> & {
	body?: any;
};

export default class HttpClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	get<TReturn>(path: string, options: RequestOptions = {}): Promise<TReturn> {
		return this.makeRequest(path, { ...options, method: 'GET' });
	}

	post<TReturn>(path: string, options: RequestOptions = {}): Promise<TReturn> {
		return this.makeRequest(path, {
			...options,
			body: options.body ? JSON.stringify(options.body) : undefined,
			method: 'POST',
		});
	}

	put<TReturn>(path: string, options: RequestOptions = {}): Promise<TReturn> {
		return this.makeRequest(path, {
			...options,
			body: options.body ? JSON.stringify(options.body) : undefined,
			method: 'PUT',
		});
	}

	delete<TReturn>(path: string, options: RequestOptions = {}): Promise<TReturn> {
		return this.makeRequest(path, {
			...options,
			body: options.body ? JSON.stringify(options.body) : undefined,
			method: 'DELETE',
		});
	}

	private async makeRequest<TReturn>(path: string, options: RequestOptions = {}): Promise<TReturn> {
		const headers = new Headers();

		if (options.body) {
			headers.append('Content-Type', 'application/json');
		}

		if (options.headers) {
			Object.entries(options.headers).forEach(([key, value]) => {
				headers.append(key, value);
			});
		}

		const response = await fetch(`${this.baseURL}${path}`, {
			...options,
			headers,
		});

		const contentType = response.headers.get('content-type');

		let responseBody = null;

		if (contentType?.includes('application/json')) {
			responseBody = await response.json();
		}

		if (response.ok) {
			return responseBody as TReturn;
		}

		throw new ApiError(response, responseBody);
	}
}
