const login = require('./controllers/loginController');
let { Router } = require("express");
let router = new Router();
const isLogged = require('../../utils/middlewares/isLogged');

module.exports = (app) => {
    app.use('/login', isLogged, router);

    router.get('/', login.renderLogin)
    router.post('/', login.postLogin)
}