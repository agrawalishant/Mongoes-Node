var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const LifeCycleSchema = new Schema(
  {
    mainTitle: { type: String },
    description: { type: String },
    image: { type: String },
    title: { type: String },
    body: { type: String },
    //    alt:{type:String}
  },
  { timestamps: true }
);

// defining a Customer model
var LifeCycle = mongoose.model("LifeCycle", LifeCycleSchema);
module.exports = LifeCycle;
