const logger = require('../../../utils/logging');
const DAO = require('../../../config/database/DTOS/ordersDTO');

class ordersService {
    createOrder = async order => {
        try {
            await DAO.createOrder(order)
        }
        catch (err) {
            logger.error(err)
        }
    }

    findOrdersByEmail = async email => {
        try {
            return await DAO.findOrdersByEmail(email)
        }
        catch (err) {
            logger.error(err)
        }
    }
}

module.exports = new ordersService()