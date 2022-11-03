var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const excitedWork = new Schema(
  {
    title: { type: String },
    description: { type: String },
    profileName:{type:String},
    experience:{type:String},
    location:{type:String},
    content:{type:String}
  },
  { timestamps: true }
);

// defining a Customer model
var ExcitedWork = mongoose.model("ExcitedWorkUs", excitedWork);
module.exports = ExcitedWork;
