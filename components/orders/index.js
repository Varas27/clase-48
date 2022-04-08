const orders = require('./controllers/ordersController');
const auth = require('../../utils/middlewares/auth');
let { Router } = require("express");
let router = new Router();

module.exports = (app) => {
    app.use('/orders', auth, router);

    router.get('/', orders.renderOrders)
}