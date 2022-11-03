var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const careerObj = new Schema(
  {
    mainTitle: { type: String },
    description: { type: String },
    image: { type: String },
    alt: {type: String},
    title:{type:String},
    body:{type:String},
  },
  { timestamps: true }
);

var CareerOurValue = mongoose.model("CareerOurValue", careerObj);
module.exports = CareerOurValue;
