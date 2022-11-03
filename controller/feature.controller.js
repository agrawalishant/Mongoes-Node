const Features = require("../model/feature.model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var features = new Features({
    title: req.body.title,
    image: `${url}${req.file.path}`,
    alt: req.body.alt,
    description: req.body.description,
    // title1: req.body.title1
  });
  features.save().then(
    (doc) => {
      doc.isNew === false;
      res.status(200).send(doc);
    },
    (e) => {
      res.status(400).json({ success: false, message: e.message });
    }
  );
};

exports.findAll = (req, res) => {
  Features.find().then(
    (features) => {
      res.status(200).send(features);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.findOne = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Features.findById(id)
    .then((features) => {
      if (!features) {
        return res.status(404).send();
      }
      res.status(200).send(features);
    })
    .catch((e) => {
      res.status(400).send();
    });
};

exports.update = (req, res) => {
  var id = req.params.id;
  // const navbar = new Navbar
  // var body = _.pick(req.body);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Features.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      image: `${url}${req.file.path}`,
      //   alt: req.body.alt,
      description: req.body.description,
      // title1: req.body.title1
    },
    { new: true }
  )
    .then((features) => {
      if (!features) {
        return res.status(404).send();
      }
      res.status(200).send(features);
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Features.findByIdAndRemove(id)
    .then((features) => {
      if (!features) {
        return res.status(404).send("data not found..");
      }
      res.status(200).send("data deleted successfully....");
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};
