require('../config/database/connections/mongodb');

const products = require('../components/products');
const login = require('../components/login');
const logout = require('../components/logout');
const signup = require('../components/signup');
const profile = require('../components/profile');
const cart = require('../components/cart');
const chat = require('../components/chat');
const orders = require('../components/orders');

module.exports = (app) => {
    app.get('/', (req, res) => { res.redirect('/products') })
    products(app);
    login(app);
    logout(app);
    signup(app);
    profile(app);
    cart(app);
    chat(app);
    orders(app);
}