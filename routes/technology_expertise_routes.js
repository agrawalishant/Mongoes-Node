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
  const ourTechnology = require("../controller/technology_expertise_controller");

  app.post("/tecnologyExpertise", uploadImg, ourTechnology.create);

  app.get("/tecnologyExpertise", ourTechnology.findAll);

  app.get("/tecnologyExpertise/:id", ourTechnology.findOne);

  app.patch("/tecnologyExpertise/:id",uploadImg, ourTechnology.update);

  app.delete("/tecnologyExpertise/:id", ourTechnology.delete);
};
