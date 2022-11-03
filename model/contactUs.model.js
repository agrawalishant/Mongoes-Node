var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ContactUsSchema = new Schema(
  {
    email: { type: String },
    message: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);

// defining a Customer model
var ContactUs = mongoose.model("ContactUs", ContactUsSchema);
module.exports = ContactUs;
