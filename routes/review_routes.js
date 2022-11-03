const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./review");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const uploadImg = multer({ storage: storage }).single("image");

module.exports = (app) => {
  const review = require("../controller/review_controller");

  app.post("/review", uploadImg, review.create);

  app.get("/review", review.findAll);

  app.get("/review/:id", review.findOne);

  app.patch("/review/:id", review.update);

  app.delete("/review/:id", review.delete);
};
