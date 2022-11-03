module.exports = (app) => {
    const CompanyPerk = require("../controller/companyPerk_controller");
  
    app.post("/companyPerk", CompanyPerk.create);
  
    app.get("/companyPerk", CompanyPerk.findAll);
  
    app.get("/companyPerk/:id", CompanyPerk.findOne);
  
    app.get("/companyPerk/:id", CompanyPerk.update);
  
    app.delete("/companyPerk/:id", CompanyPerk.delete);
  };
  