const TechnologyChild = require('../model/technology_child_model');
var { ObjectID } = require('mongodb');

var url = `https://therapidhiredev.herokuapp.com/`;

exports.create = (req, res) => {
  var technology = new TechnologyChild({
    title:req.body.title,
    image:`${url}${req.file.path}`,
    description:req.body.description,
    alt:req.body.alt,
  });
 
  technology.save().then((doc) => {
    (doc.isNew === false)
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).json({ success: false, message: e.message })
  });
};

exports.findAll = (req, res) => {
    TechnologyChild.find()
.then((technology) => {
  
   res.status(200).send(technology);
  }, (e) => {
    res.status(500).send({message:e.message});
  })
};

exports.findOne = (req, res) => {
var id = req.params.id;
if (!ObjectID.isValid(id)) {
   return res.status(404).send();
}
TechnologyChild.findById(id)
.then((technology) => {
     if (!technology) {
         return res.status(404).send();
     }
     res.status(200).send(technology);
}).catch((e) => {
   res.status(500).send();
});
};


exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  TechnologyChild.findByIdAndRemove(id).then((technology) => {
       if (!technology) {
          return res.status(404).send();
       }
       res.status(200).send({message:"data deleted successfully..."});
  }).catch((e) => {
    res.status(400).send();
  });
};

exports.update = (req, res) => {
    var technology = {
      title:req.body.title,
      image:`${url}${req.file.path}`,
      description:req.body.description,
      alt:req.body.alt,
    }
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ message: "Id Not Found" });
  }
  TechnologyChild.findByIdAndUpdate(id,technology, { new: true })
    .then((technology) => {
      res.status(200).send({ message: "your data successfully updated....", data: technology });
    }).catch((e) => {
      res.status(400).send({ message: e.message });
    })
};
