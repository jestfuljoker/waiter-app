enum OrderStatus {
	WAITING = 'WAITING',
	IN_PRODUCTION = 'IN_PRODUCTION',
	DONE = 'DONE',
}

export interface Ingredients {
	id: string;
	name: string;
	icon: string;
}

export interface Product {
	id: string;
	name: string;
	description: string;
	imagePath: string;
	price: number;
	ingredients: Ingredients[];
}

export interface Order {
	id: string;
	table: string;
	status: OrderStatus;
	createdAt: string;
	products: {
		id: string;
		quantity: number;
		product: Product;
	}[];
}
