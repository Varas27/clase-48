const messageModel = require('../../../schemas/messages');
const logger = require('../../../utils/logging');

class messagesDao {
    getAll = async () => {
        try {
            return await messageModel.find({});
        }
        catch (err){
            logger.error(err)
        }
    }

    getAccountMessages = async email => {
        try {
            return await messageModel.find({'author.email': email}).lean();
        }
        catch (err){
            logger.error(err)
        }
    }

    create = async message => {
        try {
            await messageModel.create(message);
        }
        catch (err){
            logger.error(err)
        }
    }
}

module.exports = new messagesDao()