const usersDaoMongodb = require('../DAOS/usersDaoMongodb');
const logger = require('../../../utils/logging');

class usersDTO {
    constructor(){
        this.DAO = usersDaoMongodb;  // If there were 2 or more DAOS a conditional would be done
    }
    
    findOne = async filter => {
        try {
            return await this.DAO.findOne(filter);
        }
        catch (err){
            logger.error(err)
        }
    }

    create = async obj => {
        try {
            await this.DAO.create(obj);
        }
        catch (err){
            logger.error(err)
        }
    }
}

module.exports = new usersDTO()