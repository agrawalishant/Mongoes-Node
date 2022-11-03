var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const testimonialObj = new Schema(
  {
    title: { type: String },
    mainDescription: { type: String },
    image: { type: String },
    alt: {type: String},
    name:{type:String},
    designation:{type:String},
    body:{type:String},
    rating:{type:Number}

  },
  { timestamps: true }
);

// defining a Customer model
var Testimonial = mongoose.model("Testimonial", testimonialObj);
module.exports = Testimonial;
