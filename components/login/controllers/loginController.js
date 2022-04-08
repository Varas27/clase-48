const loginService = require('../services/loginService');
const generateToken = require('../../../utils/generate_token');
const logger = require('../../../utils/logging');

class loginController {
    renderLogin = (req, res) => {
        try {
            res.render('layouts/login', { layout: 'login' })
        }
        catch (err) {
            logger.error(err)
        }
    }

    postLogin = async (req, res) => {
        try {
            const userObj = req.body;
            let user = await loginService.findUser(userObj);
            if (!user) {
                return res.render('layouts/login_error', { layout: 'login_error' })
            }
            const access_token = await generateToken(user);
            req.session.token = `Bearer ${access_token}`
            res.redirect('/products')
        }
        catch (err) {
            logger.error(err)
        }
    }
}

module.exports = new loginController()