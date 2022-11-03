var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    image: { type: String },

  },
  { timestamps: true }
);

// defining a Customer model
var Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
