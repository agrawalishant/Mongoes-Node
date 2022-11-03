const LifeCycle = require("../model/lifeCycle_model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var lifeCycle = new LifeCycle({
    mainTitle: req.body.mainTitle,
    description: req.body.description,
    image: `${url}${req.file.path}`,
    title: req.body.title,
    body: req.body.body,
  
  });
  lifeCycle.save().then(
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
  LifeCycle.find().then(
    (lifeCycle) => {
      res.status(200).send(lifeCycle);
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
  LifeCycle.findById(id)
    .then((lifeCycle) => {
      if (!lifeCycle) {
        return res.status(404).send();
      }
      //   res.send(features);
      res.status(200).send(lifeCycle);
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
  LifeCycle.findByIdAndUpdate(
    id,
    {
      mainTitle: req.body.mainTitle,
      description: req.body.description,
      image:`${url}${req.file.path}`,
      title: req.body.title,
      body: req.body.body,

      //   alt: req.body.alt,
      // title1: req.body.title1
    },
    { new: true }
  )
    .then((lifeCycle) => {
      if (!lifeCycle) {
        return res.status(404).send();
      }
      //   res.send(lifeCycle);
      res.status(200).send({
        message: "your data successfully updated....",
        data: lifeCycle,
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
  LifeCycle.findByIdAndRemove(id)
    .then((lifeCycle) => {
      if (!lifeCycle) {
        return res.status(404).send();
      }
      //   res.send(features);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
