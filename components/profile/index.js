const profile = require('./controllers/profileController');
const auth = require('../../utils/middlewares/auth');
let { Router } = require("express");
let router = new Router();

module.exports = (app) => {
    app.use('/profile', auth, router);

    router.get('/', profile.renderProfile)
}