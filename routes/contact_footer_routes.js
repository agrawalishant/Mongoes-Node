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
    const footerBanner = require('../controller/contact_footer_controller');

    app.post('/footerBanner',uploadImg,footerBanner.create);
    app.get('/footerBanner',footerBanner.findAll);
    app.get('/footerBanner/:id',footerBanner.findOne);
    app.delete('/footerBanner/:id',footerBanner.delete);
    app.patch('/footerBanner/:id',uploadImg,footerBanner.update);
}