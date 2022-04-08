const bcrypt = require('bcrypt');
const logger = require('../../../utils/logging');
const DAO = require('../../../config/database/DTOS/usersDTO');

class signupService {
    findUser = async newUser => {
        try {
            let user = await DAO.findOne({ email: newUser.email });
            return user;
        }
        catch (err) {
            logger.error(err)
        }
    }

    pushUser = async newUser => {
        try {
            let passwordHash = await bcrypt.hash(newUser.password, 8)
            newUser.password = passwordHash;
            await DAO.create(newUser);
        }
        catch (err) {
            logger.error(err)
        }
    }
}

module.exports = new signupService();