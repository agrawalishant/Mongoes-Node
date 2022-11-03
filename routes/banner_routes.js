const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './banner');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const uploadImg = multer({ storage: storage }).single('image');

module.exports = (app) => {
    const Banner = require('../controller/banner_controller');

    app.post('/banner',uploadImg,Banner.create);
    app.get('/banner',Banner.findAll);
    app.get('/banner/:id',Banner.findOne);
    app.delete('/banner/:id',Banner.delete);
    app.patch('/banner/:id',uploadImg,Banner.update);
}