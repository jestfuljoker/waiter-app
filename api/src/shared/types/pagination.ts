export type PaginatedRequest<T = unknown> = {
	page: number;
	limit: number;
} & T;

export type PaginatedResponse<T> = {
	count?: number;
	pages?: number;
	items: T[];
};
