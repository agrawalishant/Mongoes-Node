const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './technology');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const uploadImg = multer({ storage: storage }).single('image');

module.exports = (app) => {
    const Technology = require('../controller/technology_child_controller');

    app.post('/technologyChild',uploadImg,Technology.create);
    app.get('/technologyChild',Technology.findAll);
    app.get('/technologyChild/:id',Technology.findOne);
    app.delete('/technologyChild/:id',Technology.delete);
    app.patch('/technologyChild/:id',uploadImg,Technology.update);

}