var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ServicesSchema = new Schema({
   title: { type: String },
   description: { type: String },
   image: { type: String },
   alt:{type:String}
}, { timestamps: true })

// defining a Customer model
var Services = mongoose.model('Service', ServicesSchema);
module.exports = Services;