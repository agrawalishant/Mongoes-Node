module.exports = (app) => {
    const Footer = require("../controller/footer_controller");
  
    app.post("/footer", Footer.create);
  
    app.get("/footer", Footer.findAll);
  
    app.get("/footer/:id", Footer.findOne);
  
    app.patch("/footer/:id", Footer.update);
  
    app.delete("/footer/:id", Footer.delete);
  };
  