module.exports = (app) => {
    const PrivacyAndPolicy = require("../controller/policy_controller");
  
    app.post("/privacyAndPolicy", PrivacyAndPolicy.create);
  
    app.get("/privacyAndPolicy", PrivacyAndPolicy.findAll);
  
    app.get("/privacyAndPolicy/:id", PrivacyAndPolicy.findOne);
  
    app.patch("/privacyAndPolicy/:id", PrivacyAndPolicy.update);
  
    app.delete("/privacyAndPolicy/:id", PrivacyAndPolicy.delete);
  };
  