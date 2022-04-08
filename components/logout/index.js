const logout = require('./controllers/logoutController');
const auth = require('../../utils/middlewares/auth');
let { Router } = require("express");
let router = new Router();

module.exports = (app) => {
    app.use('/logout', auth, router);

    router.get('/', logout.renderLogout)
}