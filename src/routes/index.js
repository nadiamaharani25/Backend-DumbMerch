const express = require('express');

const router = express.Router();

const {
    addUsers,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getProfile,
    getUserProducts } = require('../controllers/user');

const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct } = require('../controllers/product');

const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory } = require('../controllers/category');

const { getTransactions, addTransaction } = require('../controllers/transaction');

const { getShoppingCart } = require('../controllers/shoppingcart');

const { register, login } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// Route
router.post('/user', addUsers);
router.get('/users', auth, getUsers);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/user-products', getUserProducts);

router.get('/profiles', getProfile);

router.get('/products', getProducts);
router.get('/product/:id', auth, getProduct);
router.post('/product', auth, uploadFile('image'), addProduct);
router.patch('/product/:id', auth, updateProduct);
router.delete('/product/:id', auth, deleteProduct);

router.get('/categories', getCategories);
router.get('/category/:id', auth, getCategory);
router.post('/category', auth, addCategory);
router.patch('/category/:id', auth, updateCategory);
router.delete('/category/:id', auth, deleteCategory);

router.get('/transactions', auth, getTransactions);
router.post('/transaction', auth, addTransaction);

router.get('/shoppingcarts', getShoppingCart);

router.post('/register', register);
router.post('/login', login);


module.exports = router;