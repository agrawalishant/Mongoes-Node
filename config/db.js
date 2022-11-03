var mongoose = require('mongoose');

var uri = "mongodb+srv://qoditio:Equifax2014@cluster0.lodij.mongodb.net/TheRapidHire?retryWrites=true&w=majority";

var config = {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, auto_reconnect :true
}
try {
    var db = mongoose.connect( uri, config, () =>

    console.log("connected"));    
    
    }catch (error) { 
    console.log("connection time out");    
    }		

module.exports.db = db;