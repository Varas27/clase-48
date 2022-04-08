const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "myprivatekey";

const generateToken = async user => {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, {});
    return token;
  }
  
module.exports = generateToken;