var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const technologySchema = new Schema({
   title: { type: String },
   description: { type: String },
   image: { type: String },
   alt:{type:String}
}, { timestamps: true })

// defining a Customer model
var TechnologyChild = mongoose.model('TechnologyChild', technologySchema);
module.exports = TechnologyChild;