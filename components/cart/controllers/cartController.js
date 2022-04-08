const logger = require('../../../utils/logging');
const cartService = require('../services/cartService');
const orderService = require('../../orders/services/ordersService');
const messaging = require('../../../utils/messaging');
const sendEmail = messaging.sendEmail;
const sendMessage = messaging.sendMessage;

class cartController {
    renderCart = async (req, res) => {
        try {
            let cart = await cartService.getCart(req);
            let total = await cartService.getTotalPrice(cart);
            res.render('layouts/cart', { layout: 'cart', cart: cart.products, total });
        }
        catch (err) {
            logger.error(err);
        }
    }

    postProductInCart = async (req, res) => {
        try {
            let cart = await cartService.getCart(req);
            let id = req.body.id;
            let newCart = await cartService.addProductInCart(id, cart);
            req.session.cart = newCart;
            res.redirect('/products');
        }
        catch (err) {
            logger.error(err);
        }
    }

    deleteProductInCart = async (req, res) => {
        try {
            let cart = await cartService.getCart(req);
            let deletedProduct = req.query.name;
            let newCart = await cartService.deleteProductInCart(deletedProduct, cart);
            req.session.cart = newCart;
            res.redirect('/cart');
        }
        catch (err) {
            logger.error(err);
        }
    }

    completePurchase = async (req, res) => {
        try {
            let cart = await cartService.getCart(req);
            if (cart.products) {
                let totalPrice = await cartService.getTotalPrice(cart);
                await sendEmail(`Nuevo pedido de: ${req.user.name} - ${req.user.email}`, req.user, cart, totalPrice);
                await sendMessage(`Nuevo pedido de: ${req.user.name} - ${req.user.email}`, 'whatsapp:+5491122494345', 'whatsapp');
                // await sendMessage('Su pedido ha sido recibido y se encuentra en proceso', `+${req.user.tel}`, 'SMS');
                // IMPORTANT | Non-verified numbers only available with upgraded twilio account
                await cartService.emptyCart(req);
                cart.total = totalPrice;
                cart.state = 'Generada'
                await orderService.createOrder(cart);
                res.render('layouts/purchase_complete', { layout: 'purchase_complete', totalPrice });
            } else {
                return res.redirect('/products');
            }
        }
        catch (err) {
            logger.error(err);
        }
    }
}

module.exports = new cartController()