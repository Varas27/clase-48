const DAO = require('../../../config/database/DTOS/messagesDTO');
const logger = require('../../../utils/logging');

class chatService {
    getMessages = async () => {
        try {
            return await DAO.getAll();
        }
        catch (err) {
            return []
        }
    }

    getAccountMessages = async email => {
        try {
            return await DAO.getAccountMessages(email);
        }
        catch (err) {
            logger.error(err);
        }
    }

    pushMessages = async message => {
        try {
            await DAO.create(message);
        }
        catch (err) {
            logger.error(err);
        }
    }
}

module.exports = new chatService()