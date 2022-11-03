const Overview = require("../model/overview_model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var overview = new Overview({
    title: req.body.title,
    image: `${url}${req.file.path}`,
    // alt: req.body.alt,
    description: req.body.description,
    // title1: req.body.title1
  });
  overview.save().then(
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
  Overview.find().then(
    (overview) => {
      res.status(200).send(overview);
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
  Overview.findById(id)
    .then((overview) => {
      if (!overview) {
        return res.status(404).send();
      }
      //   res.send(overview);
      res.status(200).send(overview);
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
  Overview.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      image: req.body.image,
      //   alt: req.body.alt,
      description: req.body.description,
      // title1: req.body.title1
    },
    { new: true }
  )
    .then((overview) => {
      if (!overview) {
        return res.status(404).send();
      }
      //   res.send(overview);
      res.status(200).send({
        message: "your data successfully updated....",
        data: overview,
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
  Overview.findByIdAndRemove(id)
    .then((overview) => {
      if (!overview) {
        return res.status(404).send();
      }
      //   res.send(overview);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
