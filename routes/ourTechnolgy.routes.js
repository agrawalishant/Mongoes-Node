const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./technology");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const uploadImg = multer({ storage: storage }).single("image");

module.exports = (app) => {
  const ourTechnology = require("../controller/ourTechnology.controller");

  app.post("/ourTechnology", uploadImg, ourTechnology.create);

  app.get("/ourTechnology", ourTechnology.findAll);

  app.get("/ourTechnology/:id", ourTechnology.findOne);

  app.patch("/ourTechnology/:id",uploadImg, ourTechnology.update);

  app.delete("/ourTechnology/:id", ourTechnology.delete);
};
