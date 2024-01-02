import { type Ingredient } from './Ingredient';

export class Product {
	name: string;
	description: string;
	imagePath: string;
	price: number;
	ingredients: Ingredient[];
	categoryId: string;
}
