const auth = require('../../utils/middlewares/auth');
let { Router } = require("express");
let router = new Router();
let chat = require('./controllers/chatController');

module.exports = (app) => {
    app.use('/chat', auth, router);
    
    router.get('/', chat.renderChat);
    router.get('/history', chat.getAccountMessages);
}