const logger = require('../../../utils/logging');
const ordersService = require('../services/ordersService');

class ordersController {
    renderOrders = async (req, res) => {
        try {
            let email = req.user.email
            const orders = await ordersService.findOrdersByEmail(email);
            res.render('layouts/orders', { layout: 'orders', orders });
        }
        catch (err) {
            logger.error(err)
        }
    }
}

module.exports = new ordersController()