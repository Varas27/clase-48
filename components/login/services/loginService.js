const bcrypt = require('bcrypt');
const logger = require('../../../utils/logging');
const DAO = require('../../../config/database/DTOS/usersDTO');

class loginService {
    findUser = async userObj => {
        try {
            let user = await DAO.findOne({ email: userObj.email });
            let compare = await bcrypt.compare(userObj.password, user.password);
            if(compare) {
                return user
            }
        }
        catch (err) {
            logger.error(err)
        }
    }
}

module.exports = new loginService();