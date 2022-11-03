const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './logo');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const uploadImg = multer({ storage: storage }).single('logo');

module.exports = (app) => {
    const Navbar = require("../controller/navbar_controller");
  
    app.post("/navbar",uploadImg, Navbar.create);
  
    app.get("/navbar", Navbar.findAll);
  
    app.get("/navbar/:id", Navbar.findOne);
  
    app.patch("/navbar/:id", Navbar.update);
  
    app.delete("/navbar/:id", Navbar.delete);
  };7
  