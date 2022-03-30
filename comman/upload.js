var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var destination = 'temp';
        if (req.FILE_DESTINATION) {
            destination = req.FILE_DESTINATION;
        }
        cb(null, path.join(APP_PATH, path.join('public', destination)))
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

IMAGE_STORAGE = module.exports = multer({ storage: storage })