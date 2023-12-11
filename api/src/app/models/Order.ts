import { type InferSchemaType, Schema, model } from 'mongoose';

export type Order = InferSchemaType<typeof orderSchema>;

const orderSchema = new Schema({
	table: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
		default: 'WAITING',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	products: {
		required: true,
		type: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
	},
});

export const OrderModel = model('Order', orderSchema);
