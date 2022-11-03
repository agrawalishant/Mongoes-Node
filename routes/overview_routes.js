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
  const overview = require("../controller/overview_controller");

  app.post("/overview", uploadImg, overview.create);

  app.get("/overview", overview.findAll);

  app.get("/overview/:id", overview.findOne);

  app.patch("/overview/:id", overview.update);

  app.delete("/overview/:id", overview.delete);
};
