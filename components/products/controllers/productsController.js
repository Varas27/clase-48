const productsService = require('../services/productsService');
const logger = require('../../../utils/logging');

class productsController {
    getAll = async (req, res) => {
        try {
            const productList = await productsService.getAll();
            res.render('layouts/main', { data: productList });
        }
        catch (err) {
            logger.error(err);
        }
    }

    getByCategory = async (req, res) => {
        try {
            let category = req.params.category;
            const productListByCategory = await productsService.getByCategory(category);
            if (productListByCategory.length === 0) {
                category = false;
            };
            res.render('layouts/main', { category, data: productListByCategory });
        }
        catch (err) {
            logger.error(err)
        }
    }

    getOne = async (req, res) => {
        try {
            let id = req.params.id;
            let product = await productsService.getOne(id);
            res.render('layouts/product_details', { layout: 'product_details', data: product });
        }
        catch (err) {
            logger.error(err);
        }
    }
}

module.exports = new productsController()