module.exports = (app) => {
  const Home = require("../controller/home_controller");

  app.post("/Home",Home.create);

  app.get("/Home", Home.findAll);

  app.get("/Home/:id", Home.findOne);

  app.patch("/Home/:id",Home.update);

  app.delete("/Home/:id", Home.delete);
};
