const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produchSchema = new Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 150,
		required: true,
	},
	price: {
		type: Number,
		min: 0,
		required: true,
	},
	isActive: {
		type: Boolean,
		default: false,
	},
	pictures: {
		type: [String],
	},
	sizes: {
		type: [{ type: String, enum: ['S', 'M', 'L', 'XL', 'XXL'] }],
	},
	tags: {
		type: [{ type: String }],
	},
	color: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 150,
	},
	brand: {
		type: String,
		minlength: 3,
		maxlength: 150,
	},
	description: {
		type: String,
		minlength: 3,
		maxlength: 960,
	},
	category: {
		type: String,
		enum: ['jacket', 'dress', 'overall', 'trousers', 'skirt', 'other', 'accesory'],
		required: true,
	},
	inStock: {
		type: Number,
		default: 0,
	},
	discount: {
		type: Number,
		default: 0,
		min: 0,
		max: 99.99,
	},
	added: {
		type: Date,
		default: new Date(),
	},
});

const Product = mongoose.model('Product', produchSchema);

module.exports = Product;
