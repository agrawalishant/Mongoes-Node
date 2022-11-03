module.exports = (app) => {
    const ExcitedWorkUs = require("../controller/excited_work_us_controller");
  
    app.post("/excitedWorkUs", ExcitedWorkUs.create);
  
    app.get("/excitedWorkUs", ExcitedWorkUs.findAll);
  
    app.get("/excitedWorkUs/:id", ExcitedWorkUs.findOne);
  
    app.patch("/excitedWorkUs/:id", ExcitedWorkUs.update);
  
    app.delete("/excitedWorkUs/:id", ExcitedWorkUs.delete);
  };
  