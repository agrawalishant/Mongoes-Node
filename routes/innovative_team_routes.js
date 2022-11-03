const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./team");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const uploadImg = multer({ storage: storage }).single("image");

module.exports = (app) => {
  const innovativeTeam = require("../controller/innovatative_team_controller");

  app.post("/innovativeTeam", uploadImg, innovativeTeam.create);

  app.get("/innovativeTeam", innovativeTeam.findAll);

  app.get("/innovativeTeam/:id", innovativeTeam.findOne);

  app.patch("/innovativeTeam/:id",uploadImg, innovativeTeam.update);

  app.delete("/innovativeTeam/:id", innovativeTeam.delete);
};
