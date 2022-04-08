const productModel = require('../../../schemas/products');
const logger = require('../../../utils/logging');

class productsDao {
    getAll = async () => {
        try {
            return await productModel.find({}).lean();
        }
        catch (err){
            logger.error(err)
        }
    }

    getByCategory = async category => {
        try {
            return await productModel.find({category}).lean();
        }
        catch (err) {
            logger.error(err)
        }
    }

    getOne = async id => {
        try {
            return await productModel.findOne({_id: id}).lean()
        }
        catch (err) {
            logger.error(err)

        }
    }

    getOneWithFilters = async id => {
        try {
            return await productModel.findOne({_id: id}, {category: 0, description: 0}).lean()
        }
        catch (err) {
            logger.error(err)

        }
    }
}

module.exports = new productsDao()