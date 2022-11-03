const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./career");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const uploadImg = multer({ storage: storage }).single("image");

module.exports = (app) => {
  const CareerOurValue = require("../controller/career_ourValue_controller");

  app.post("/CareerOurValue", uploadImg, CareerOurValue.create);

  app.get("/CareerOurValue", CareerOurValue.findAll);

  app.get("/CareerOurValue/:id", CareerOurValue.findOne);

  app.patch("/CareerOurValue/:id",uploadImg, CareerOurValue.update);

  app.delete("/CareerOurValue/:id", CareerOurValue.delete);
};
