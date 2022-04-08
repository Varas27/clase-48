let mongoose = require('mongoose');
let config = require('../..');
const logger = require('../../../utils/logging');

module.exports = (async () => {
    try{
        await mongoose.connect(config.mongo_db_uri, { useNewUrlParser: true, useUnifiedTopology: true });
        logger.info('Connected to mongoDB database')
    } catch(error){
        logger.error(error)
    }
})();