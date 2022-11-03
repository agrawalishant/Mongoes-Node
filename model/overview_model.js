var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const OverviewSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    image: { type: String },
    //    alt:{type:String}
  },
  { timestamps: true }
);

// defining a Customer model
var Overview = mongoose.model("Overview", OverviewSchema);
module.exports = Overview;
