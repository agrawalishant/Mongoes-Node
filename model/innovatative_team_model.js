var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const InnovativeTeamObj = new Schema(
  {
    title: { type: String },
    description: { type: String },
    name: { type: String },
    designation: { type: String },
    image: { type: String },
    alt: {type: String},
  },
  { timestamps: true }
);

// defining a Customer model
var InnovativeTeam = mongoose.model("InnovativeTeam", InnovativeTeamObj);
module.exports = InnovativeTeam;
