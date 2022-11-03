var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TeamObj = new Schema(
  {
    title: { type: String },
    description: { type: String },
    image: { type: String },
    alt: {type: String}
  },
  { timestamps: true }
);

// defining a Customer model
var Team = mongoose.model("Team", TeamObj);
module.exports = Team;
