const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./testimonial");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const uploadImg = multer({ storage: storage }).single("image");

module.exports = (app) => {
  const testimonial = require("../controller/testimonial_controller");

  app.post("/testimonial", uploadImg, testimonial.create);

  app.get("/testimonial", testimonial.findAll);

  app.get("/testimonial/:id", testimonial.findOne);

  app.patch("/testimonial/:id",uploadImg, testimonial.update);

  app.delete("/testimonial/:id", testimonial.delete);
};
