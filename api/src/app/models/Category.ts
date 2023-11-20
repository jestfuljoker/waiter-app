import { InferSchemaType, Schema, model } from 'mongoose';

export type Category = InferSchemaType<typeof categorySchema>;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
});

export const CategoryModel = model('Category', categorySchema);
