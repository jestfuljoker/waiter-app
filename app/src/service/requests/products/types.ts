export interface Product {
	id: string;
	name: string;
	description: string;
	imagePath: string;
	price: number;
	ingredients: {
		name: string;
		icon: string;
		id: string;
	}[];
}
