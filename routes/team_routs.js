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
  const team = require("../controller/team_controller");

  app.post("/teams", uploadImg, team.create);

  app.get("/teams", team.findAll);

  app.get("/teams/:id", team.findOne);

  app.patch("/teams/:id",uploadImg, team.update);

  app.delete("/teams/:id", team.delete);
};
