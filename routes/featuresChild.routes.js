const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./feature");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const uploadImg = multer({ storage: storage }).single("image");

module.exports = (app) => {
  const featuresChild = require("../controller/featuresChild.controller");

  app.post("/featuresChild", uploadImg, featuresChild.create);

  app.get("/featuresChild", featuresChild.findAll);

  app.get("/featuresChild/:id", featuresChild.findOne);

  app.patch("/featuresChild/:id",uploadImg, featuresChild.update);

  app.delete("/featuresChild/:id", featuresChild.delete);
};
