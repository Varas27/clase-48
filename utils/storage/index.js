const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/avatars')
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.email.match(/^.+(?=@)/)[0]}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    let files = fs.readdirSync('public/avatars');
    let fileName = `${req.body.email.match(/^.+(?=@)/)[0]}${path.extname(file.originalname)}`;
    let ext = path.extname(file.originalname);
    if (!files.includes(fileName) && (ext === '.png' || ext === '.jpg' || ext === '.jpeg')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({
    storage,
    fileFilter
})