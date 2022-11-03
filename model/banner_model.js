var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bannerSchema = new Schema({
   title: { type: String },
   description: { type: String },
   image: { type: String },
   alt:{type:String}
}, { timestamps: true })

// defining a Customer model
var Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;