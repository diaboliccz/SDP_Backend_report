const multer = require('multer');

const imageFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }
    else{
        cb('Please upload only images.', false);
    }
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/resources/static/assets/buyerpic')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

let uploadFile = multer({ storage: storage, fileFilter: imageFilter });


module.exports = uploadFile;