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
  const feature = require("../controller/feature.controller");

  app.post("/feature", uploadImg, feature.create);

  app.get("/feature", feature.findAll);

  app.get("/feature/:id", feature.findOne);

  app.patch("/feature/:id", uploadImg,feature.update);

  app.delete("/feature/:id", feature.delete);
};
