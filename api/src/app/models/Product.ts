import { InferSchemaType, Schema, model } from 'mongoose';

export type Product = InferSchemaType<typeof productSchema>;

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imagePath: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	ingredients: {
		required: true,
		type: [
			{
				name: {
					type: String,
					required: true,
				},
				icon: {
					type: String,
					required: true,
				},
			},
		],
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
});

export const ProductModel = model('Product', productSchema);
