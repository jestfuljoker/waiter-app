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
