const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './about');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const uploadImg = multer({ storage: storage }).single('image');

module.exports = (app) => {
    const About = require('../controller/about_controller');

    app.post('/about',uploadImg,About.create);
    app.get('/about',About.findAll);
    app.get('/about/:id',About.findOne);
    app.delete('/about/:id',About.delete);
    app.patch('/about/:id',uploadImg,About.update);

}