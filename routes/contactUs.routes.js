module.exports = (app) => {
  const contactUs = require("../controller/contactUs.controller");

  app.post("/contactus", contactUs.create);

  app.get("/contactus", contactUs.findAll);

  app.get("/contactus/:id", contactUs.findOne);

  app.get("/contactus/:id", contactUs.update);

  app.delete("/contactus/:id", contactUs.delete);
};
