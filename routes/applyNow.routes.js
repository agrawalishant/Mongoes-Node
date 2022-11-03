const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./file");
  },
  filename: function (req, file, cb) {
    // cb(null, "resume.pdf");
    // cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadfile = multer({
  storage: storage,
}).single("upload");

module.exports = (app) => {
  const ApplyNow = require("../controller/applyNow.controller");

  app.post("/applyNow", uploadfile, ApplyNow.create);

  app.get("/applyNow", ApplyNow.findAll);

  app.get("/applyNow/:id", ApplyNow.findOne);

  app.delete("/applyNow/:id", ApplyNow.delete);
};
