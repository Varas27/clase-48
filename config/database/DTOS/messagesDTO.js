const messagesDaoMongodb = require('../DAOS/messagesDaoMongodb');
const logger = require('../../../utils/logging');

class messagesDTO {
    constructor(){
        this.DAO = messagesDaoMongodb;  // If there were 2 or more DAOS a conditional would be done
    }

    getAll = async () => {
        try {
            return await this.DAO.getAll();
        }
        catch (err) {
            logger.error(err)
        }
    }

    getAccountMessages = async email => {
        try {
            return await this.DAO.getAccountMessages(email);
        }
        catch (err){
            logger.error(err)
        }
    }

    create = async message => {
        try {
            await this.DAO.create(message);
        }
        catch (err){
            logger.error(err)
        }
    }
}

module.exports = new messagesDTO()