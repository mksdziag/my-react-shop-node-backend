const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsCtrl');

router.get('/', productsController.getProducts);
router.get('/category/available/:categoryName', productsController.getActiveCategoryProducts);
router.get('/category/:categoryName', productsController.getCategoryProducts);
router.get('/brand/:brandName', productsController.getBrandProducts);
router.get('/search/:query', productsController.getSearchResults);
router.post('/', productsController.addProduct);
router.get('/:id', productsController.getProduct);
router.put('/:id', productsController.editProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
