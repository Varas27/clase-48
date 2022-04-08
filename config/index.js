const dotenv = require('dotenv');
const mode = 'FORK' // const mode = 'CLUSTER' || const mode = 'FORK'

dotenv.config();

module.exports = {
    port: process.env.PORT || 8080,
    mode,
    cors: process.env.CORS,
    node_env: process.env.NODE_ENV !== 'production',
    mongo_db_uri: process.env.MONGO_DB_URI,
    account_sid: process.env.ACCOUNT_SID,
    auth_token: process.env.AUTH_TOKEN,
    email: process.env.EMAIL,
    email_password: process.env.EMAIL_PASSWORD
};
