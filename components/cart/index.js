const cart = require('./controllers/cartController');
const auth = require('../../utils/middlewares/auth');
let { Router } = require("express");
let router = new Router();

module.exports = (app) => {
    app.use('/cart', auth, router);
    
    router.get('/', cart.renderCart);
    router.post('/', cart.postProductInCart);
    router.delete('/', cart.deleteProductInCart);
    router.get('/complete', cart.completePurchase);
}