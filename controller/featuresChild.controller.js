const FeaturesChild = require("../model/featuresChild.model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var featuresChild = new FeaturesChild({
    mainTitle: req.body.mainTitle,
    description: req.body.description,

    image: `${url}${req.file.path}`,
    title: req.body.title,
    body: req.body.body,
    // alt: req.body.alt,
    // title1: req.body.title1
  });
  featuresChild.save().then(
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
  FeaturesChild.find().then(
    (featuresChild) => {
      res.status(200).send(featuresChild);
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
  FeaturesChild.findById(id)
    .then((featuresChild) => {
      if (!featuresChild) {
        return res.status(404).send();
      }
      //   res.send(features);
      res.status(200).send(featuresChild);
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
  FeaturesChild.findByIdAndUpdate(
    id,
    {
      mainTitle: req.body.mainTitle,
      description: req.body.description,
      image: `${url}${req.file.path}`,

      title: req.body.title,
      body: req.body.body,
      // title1: req.body.title1
    },
    { new: true }
  )
    .then((featuresChild) => {
      if (!featuresChild) {
        return res.status(404).send();
      }
      //   res.send(featuresChild);
      res.status(200).send({
        message: "your data successfully updated....",
        data: featuresChild,
      });
    })
    .catch((e) => {
      res.status(400).send({ message: e.message });
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  FeaturesChild.findByIdAndRemove(id)
    .then((featuresChild) => {
      if (!featuresChild) {
        return res.status(404).send();
      }
      //   res.send(features);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
