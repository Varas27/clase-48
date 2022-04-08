const ordersDaoMongodb = require('../DAOS/ordersDaoMongodb');
const logger = require('../../../utils/logging');

class ordersDTO {
    constructor(){
        this.DAO = ordersDaoMongodb;  // If there were 2 or more DAOS a conditional would be done
    }
    
    findOrdersByEmail = async email => {
        try {
            return await this.DAO.findOrdersByEmail(email);
        }
        catch (err){
            logger.error(err)
        }
    }

    createOrder = async obj => {
        try {
            await this.DAO.createOrder(obj);
        }
        catch (err){
            logger.error(err)
        }
    }
}

module.exports = new ordersDTO()