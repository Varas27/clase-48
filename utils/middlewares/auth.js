const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "myprivatekey";

const auth = async (req, res, next) => {
    if (req.session.token) {
        const authHeader = req.session.token;
        if (!authHeader) {
            return res.json({
                error: 'No autenticado'
            });
        }
        const token = authHeader.split(' ')[1];
        let dataToken = await jwt.verify(token, PRIVATE_KEY);
        req.user = dataToken.data;
        next();
    } else {
        res.redirect('/login')
    }

}

module.exports = auth;