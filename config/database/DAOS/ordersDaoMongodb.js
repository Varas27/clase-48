const ordersModel = require('../../../schemas/orders');
const logger = require('../../../utils/logging');

class ordersDao {
    findOrdersByEmail = async email => {
        try {
            return await ordersModel.find({email}).lean();
        }
        catch (err){
            logger.error(err)
        }
    }

    createOrder = async obj => {
        try {
            await ordersModel.create(obj);
        }
        catch (err){
            logger.error(err)
        }
    }
}

module.exports = new ordersDao()