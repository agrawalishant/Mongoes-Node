module.exports = (app) => {
  const TermsAndCondition = require("../controller/termsAndCondition_controller");

  app.post("/termsAndCondition", TermsAndCondition.create);

  app.get("/termsAndCondition", TermsAndCondition.findAll);

  app.get("/termsAndCondition/:id", TermsAndCondition.findOne);

  app.patch("/termsAndCondition/:id", TermsAndCondition.update);

  app.delete("/termsAndCondition/:id", TermsAndCondition.delete);
};
