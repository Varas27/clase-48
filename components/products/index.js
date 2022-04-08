const products = require('./controllers/productsController');
const auth = require('../../utils/middlewares/auth');
let { Router } = require("express");
let router = new Router();

module.exports = (app) => {
    app.use('/products', auth, router);

    router.get('/', products.getAll)
    router.get('/:id', products.getOne)
    router.get('/cat/:category', products.getByCategory)
}