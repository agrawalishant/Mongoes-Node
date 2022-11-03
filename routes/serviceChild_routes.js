const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './serviceChild');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const uploadImg = multer({ storage: storage }).single('image');

module.exports = (app) => {
    const Service = require('../controller/serviceChild_controller');

    app.post('/serviceChild',uploadImg,Service.create);
    app.get('/serviceChild',Service.findAll);
    app.get('/serviceChild/:id',Service.findOne);
    app.delete('/serviceChild/:id',Service.delete);
    app.patch('/serviceChild/:id',uploadImg,Service.update);

}