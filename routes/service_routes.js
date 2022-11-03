const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './services');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const uploadImg = multer({ storage: storage }).single('image');

module.exports = (app) => {
    const Service = require('../controller/service_controller');

    app.post('/service',uploadImg,Service.create);
    app.get('/service',Service.findAll);
    app.get('/service/:id',Service.findOne);
    app.delete('/service/:id',Service.delete);
    app.patch('/service/:id',uploadImg,Service.update);

}