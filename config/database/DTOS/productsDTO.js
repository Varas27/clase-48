const productsDaoMongodb = require('../DAOS/productsDaoMongodb');
const logger = require('../../../utils/logging');

class productsDTO {
    constructor(){
        this.DAO = productsDaoMongodb;  // If there were 2 or more DAOS a conditional would be done
    }

    getAll = async () => {
        try {
            return await this.DAO.getAll();
        }
        catch (err) {
            logger.error(err)
        }
    }

    getByCategory = async category => {
        try {
            return await this.DAO.getByCategory(category);
        }
        catch (err) {
            logger.error(err)
        }
    }

    getOne = async id => {
        try {
            return await this.DAO.getOne(id)
        }
        catch (err) {
            logger.error(err)

        }
    }

    getOneWithFilters = async id => {
        try {
            return await this.DAO.getOneWithFilters(id)
        }
        catch (err) {
            logger.error(err)

        }
    }
}

module.exports = new productsDTO()