const logger = require('../../../utils/logging');

class profileController {
    renderProfile = (req, res) => {
        try {
            let user = req.user;
            res.render('layouts/profile', { layout: 'profile', user });
        }
        catch (err) {
            logger.error(err)
        }

    }
}

module.exports = new profileController()