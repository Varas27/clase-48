const signupService = require('../services/signupService');
const logger = require('../../../utils/logging');
const path = require('path');
const sendEmail = require('../../../utils/messaging').sendEmail;

class signupControllers {
    renderSignup = (req, res) => {
        try {
            res.render('layouts/signup', { layout: 'signup' });
        }
        catch (err) {
            logger.error(err);
        }
    }

    postSignup = async (req, res) => {
        try {
            const newUser = req.body;
            let user = await signupService.findUser(newUser);
            if (user) {
                return res.render('layouts/signup_error', { layout: 'signup_error' })
            } else {
                if (req.file) {
                    newUser.avatar = `${newUser.email.match(/^.+(?=@)/)[0]}${path.extname(req.file.originalname)}`
                }
                await signupService.pushUser(newUser);
                await sendEmail('Nuevo registro', newUser);
            }
            res.redirect('/login');
        }
        catch (err) {
            logger.error(err);
        }
    }
}

module.exports = new signupControllers()