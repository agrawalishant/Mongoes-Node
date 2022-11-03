const ServiceChild = require('../model/service_child_model');
var { ObjectID } = require('mongodb');

var url = `https://therapidhiredev.herokuapp.com/`;

exports.create = (req, res) => {
  var services = new ServiceChild({
    title:req.body.title,
    image:`${url}${req.file.path}`,
    description:req.body.description,
    alt:req.body.alt,
  });
 
  services.save().then((doc) => {
    (doc.isNew === false)
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).json({ success: false, message: e.message })
  });
};

exports.findAll = (req, res) => {
    ServiceChild.find()
.then((services) => {
  
   res.status(200).send(services);
  }, (e) => {
    res.status(500).send(e);
  })
};

exports.findOne = (req, res) => {
var id = req.params.id;
if (!ObjectID.isValid(id)) {
   return res.status(404).send();
}
ServiceChild.findById(id)
.then((services) => {
     if (!services) {
         return res.status(404).send();
     }
     res.status(200).send(services);
}).catch((e) => {
   res.status(500).send();
});
};


exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  ServiceChild.findByIdAndRemove(id).then((services) => {
       if (!services) {
          return res.status(404).send();
       }
       res.status(200).send({message:"data deleted successfully..."});
  }).catch((e) => {
    res.status(400).send();
  });
};

exports.update = (req, res) => {
    var services = {
      title:req.body.title,
      image:`${url}${req.file.path}`,
      description:req.body.description,
      alt:req.body.alt,
    }
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ message: "Id Not Found" });
  }
  ServiceChild.findByIdAndUpdate(id,services, { new: true })
    .then((services) => {
      res.status(200).send({ message: "your data successfully updated....", data: services });
    }).catch((e) => {
      res.status(400).send({ message: e.message });
    })
};
