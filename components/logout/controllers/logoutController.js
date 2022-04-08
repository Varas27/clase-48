const logger = require('../../../utils/logging');

class logoutController {
    renderLogout = (req, res) => {
        try {
            let name = req.user.name
            req.session.destroy(err => {
                if (err) logger.error(err)
                else res.render('layouts/logout', { layout: 'logout', name })
            })
        }
        catch (err) {
            logger.error(err)
        }
    }
}

module.exports = new logoutController()