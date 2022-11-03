const Technology = require("../model/technology_expertise_model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var ourTechnology = new Technology({
    title: req.body.title,
    image: `${url}${req.file.path}`,
    alt: req.body.alt,
    body: req.body.body,
    // title1: req.body.title1
  });
  ourTechnology.save().then(
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
    Technology.find().then(
    (ourTechnology) => {
      res.status(200).send(ourTechnology);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.findOne = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:'id not found...'});
  }
  Technology.findById(id)
    .then((ourTechnology) => {
      if (!ourTechnology) {
        return res.status(404).send();
      }
      res.status(200).send(ourTechnology);
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
    return res.status(404).send({message:'id not found...'});
  }
  Technology.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      image: `${url}${req.file.path}`,
        alt: req.body.alt,
      body: req.body.body,
      // title1: req.body.title1
    },
    { new: true }
  )
    .then((ourTechnology) => {
      res.status(200).send(ourTechnology);
    })
    .catch((e) => {
      res.status(400).send({message:'data deleted successfully...'});
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:"id not found"});
  }
  Technology.findByIdAndRemove(id)
    .then((ourTechnology) => {
      if (!ourTechnology) {
        return res.status(404).send();
      }
      res.status(200).send({message:'data deleted successfully...'});
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};
