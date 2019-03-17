const Product = require('../models/Product');

const getProducts = async (req, res, next) => {
	let { start, limit } = req.query;

	if (start !== undefined && limit !== undefined) {
		start = parseFloat(start);
		limit = parseFloat(limit);

		try {
			const products = await Product.find()
				.skip(start)
				.limit(limit);

			const count = await Product.count();

			res.json({ products, count });
		} catch (error) {
			res.status(500).send({ mesage: 'An error occurs...', error });
		}
	} else {
		try {
			const products = await Product.find();
			res.json(products);
		} catch (error) {
			res.status(500).send({ mesage: 'An error occurs...', error });
		}
	}
};

const getProduct = async (req, res, next) => {
	const { id } = req.params;
	console.log(id);
	try {
		const product = await Product.findById(id);
		res.json(product);
	} catch (error) {
		res.status(404).send({ mesage: 'Product Not found...', error });
	}
};

const getCategoryProducts = async (req, res, next) => {
	const { categoryName } = req.params;
	try {
		const products = await Product.find({ category: categoryName });
		res.json(products);
	} catch (error) {
		res.status(404).send({ mesage: 'Products Not found...', error });
	}
};

const getActiveCategoryProducts = async (req, res, next) => {
	const { categoryName } = req.params;
	try {
		const products = await Product.find({ category: categoryName, isActive: true });
		res.json(products);
	} catch (error) {
		res.status(404).send({ mesage: 'Products Not found...', error });
	}
};

const getBrandProducts = async (req, res, next) => {
	const { brandName } = req.params;
	try {
		const products = await Product.find({ brand: brandName });
		res.json(products);
	} catch (error) {
		res.status(404).send({ mesage: 'Products Not found...', error });
	}
};

const getSearchResults = async (req, res, next) => {
	const { query } = req.params;
	const regExp = new RegExp(query, 'i');
	try {
		const products = await Product.find({ name: regExp });
		res.json(products);
	} catch (error) {
		res.status(404).send({ mesage: 'Products Not found...', error });
	}
};

const deleteProduct = async (req, res, next) => {
	const { id } = req.params;
	try {
		const res = await Product.findByIdAndDelete(id);
		res.json(res);
	} catch (error) {
		res.status(404).send({ mesage: 'Product Not found...', error });
	}
};

const editProduct = async (req, res, next) => {
	const { id } = req.params;
	const updatedValues = req.body;
	console.log({ updatedValues, id });

	try {
		const product = await Product.findByIdAndUpdate(id, updatedValues, { new: true });
		res.json(product);
	} catch (error) {
		res.status(404).send({ mesage: 'Product not updated...', error });
	}
};

const addProduct = async (req, res, next) => {
	const newProduct = req.body;

	try {
		let product = new Product(newProduct);
		await product.save();
		res.status(201).json(product);
	} catch (error) {
		res.status(400).json({ mesage: 'Product not created... Try again', error });
	}
};

module.exports = {
	getProducts,
	getProduct,
	getCategoryProducts,
	getActiveCategoryProducts,
	getBrandProducts,
	getSearchResults,
	deleteProduct,
	editProduct,
	addProduct,
};
