const logger = require('../../../utils/logging');
let moment = require('moment');
const DAO = require('../../../config/database/DTOS/productsDTO');

class cartService {
    getCart = async (req) => {
        try {
            let cart = req.session.cart || {};
            let email = req.user.email;
            cart.timestamp = moment().format("DD/MM/YYYY h:mm:ss A");
            cart.email = email;
            return cart;
        }
        catch (err) {
            logger.error(err);
        }
    }

    getTotalPrice = async (cart) => {
        try {
            let total = 0;
            if (cart.products) {
                cart.products.forEach(element => {
                    total += element.price * element.quantity;
                })
            };
            return total;
        }
        catch (err) {
            logger.error(err);
        }
    }

    addProductInCart = async (id, cart) => {
        try {
            let newProduct = await DAO.getOneWithFilters(id);
            newProduct.quantity = 1
            let productsInCart = [];
            if (cart.products) {
                productsInCart = cart.products;
                let repeatedIndex = productsInCart.findIndex(element => element._id === id);
                if (repeatedIndex !== -1) {
                    productsInCart[repeatedIndex].quantity += newProduct.quantity;
                } else {
                    productsInCart.push(newProduct);
                }
            } else {
                productsInCart.push(newProduct);
            };
            cart.products = productsInCart;
            return cart;
        }
        catch (err) {
            logger.error(err);
        }
    }

    deleteProductInCart = async (deletedProduct, cart) => {
        try {
            const products = cart.products;
            const newProducts = products.filter(product => product.name !== deletedProduct);
            cart.products = newProducts;
            return cart;
        }
        catch (err) {
            logger.error(err)
        }
    }

    emptyCart = async req => {
        try {
            await delete req.session.cart
        }
        catch (err) {
            logger.error(err)
        }
    }
}

module.exports = new cartService()