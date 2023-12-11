export interface CreateOrderPayload {
	table: string;
	products: {
		product: string;
		quantity: number;
	}[];
}
