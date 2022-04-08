const chatService = require('../services/chatService');

class chatController {
    renderChat = async (req, res) => {
        res.render('layouts/chat', { layout: 'chat', user: req.user });
    }

    getAccountMessages = async (req, res) => {
        let email = req.user.email;
        let messages = await chatService.getAccountMessages(email);
        res.render('layouts/chat', { layout: 'account_messages', data: messages });
    }
}

module.exports = new chatController()