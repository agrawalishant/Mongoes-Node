var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const FeaturesSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    image: { type: String },
       alt:{type:String}
  },
  { timestamps: true }
);

// defining a Customer model
var Features = mongoose.model("Features", FeaturesSchema);
module.exports = Features;
