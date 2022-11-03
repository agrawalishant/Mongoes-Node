const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./lifeCycle");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const uploadImg = multer({ storage: storage }).single("image");

module.exports = (app) => {
  const lifeCycle = require("../controller/lifeCycle_controller");

  app.post("/lifeCycle", uploadImg, lifeCycle.create);

  app.get("/lifeCycle", lifeCycle.findAll);

  app.get("/lifeCycle/:id", lifeCycle.findOne);

  app.patch("/lifeCycle/:id",uploadImg,lifeCycle.update);

  app.delete("/lifeCycle/:id", lifeCycle.delete);
};
