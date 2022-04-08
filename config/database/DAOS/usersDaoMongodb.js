const userModel = require('../../../schemas/users');
const logger = require('../../../utils/logging');

class usersDao {
    findOne = async filter => {
        try {
            return await userModel.findOne(filter);
        }
        catch (err){
            logger.error(err)
        }
    }

    create = async obj => {
        try {
            await userModel.create(obj);
        }
        catch (err){
            logger.error(err)
        }
    }
}

module.exports = new usersDao()