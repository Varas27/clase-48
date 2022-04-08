const signup = require('./controllers/signupController');
const upload = require('../../utils/storage');
let { Router } = require("express");
let router = new Router();
const isLogged = require('../../utils/middlewares/isLogged');

module.exports = (app) => {
    app.use('/signup', isLogged, router);

    router.get('/', signup.renderSignup)
    router.post('/', upload.single('avatar'), signup.postSignup)
}