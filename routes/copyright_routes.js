module.exports = (app) => {
    const CopyRight = require("../controller/copyright_controller");
  
    app.post("/copyRight", CopyRight.create);
  
    app.get("/copyRight", CopyRight.findAll);
  
    app.get("/copyRight/:id", CopyRight.findOne);
  
    app.patch("/copyRight/:id", CopyRight.update);
  
    app.delete("/copyRight/:id", CopyRight.delete);
  };
  