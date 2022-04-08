const faker = require('faker');
faker.locale = 'es';
const logger = require('../../../utils/logging');
const DAO = require('../../../config/database/DTOS/productsDTO');

class productsService {
    getAll = async () => {
        try {
            return await DAO.getAll();
        }
        catch (err) {
            logger.error(err)
        }
    }

    getByCategory = async category => {
        try {
            return await DAO.getByCategory(category)
        }
        catch (err) {
            logger.error(err)
        }
    }

    getOne = async id => {
        try {
            return await DAO.getOne(id);
        }
        catch (err) {
            logger.error(err);
        }
    }
}

module.exports = new productsService()