var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const HomeSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

// defining a Customer model
var Home = mongoose.model("HomePage", HomeSchema);
module.exports = Home;
