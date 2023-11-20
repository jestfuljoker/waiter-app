import mongoose from 'mongoose';

mongoose.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (_, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

export function connect(cb: () => void) {
	mongoose
		.connect('mongodb://localhost:27017/test')
		.then(() => {
			console.log('📚 MongoDB connected!!!');

			cb();
		})
		.catch((err) => console.error('Error connecting to MongoDB: ', err));
}
