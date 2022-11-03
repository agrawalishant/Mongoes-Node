const InnovativeTeam = require("../model/innovatative_team_model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var teamObj = new InnovativeTeam({
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    designation: req.body.designation,
    image: `${url}${req.file.path}`,
    alt: req.body.alt
  });
  teamObj.save().then(
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
    InnovativeTeam.find().then(
    (team) => {
      res.status(200).send(team);
    },
    (e) => {
      res.status(400).send({message:e.message});
    }
  );
};

exports.findOne = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:'id not found...'});
  }
  InnovativeTeam.findById(id)
    .then((team) => {
      if (!team) {
        return res.status(404).send();
      }
      res.status(200).send(team);
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};

exports.update = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:'id not found...'});
  }
  InnovativeTeam.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      name: req.body.name,
      designation: req.body.designation,
      image: `${url}${req.file.path}`,
      alt: req.body.alt
    },
    { new: true }
  )
    .then((team) => {
      res.status(200).send(team);
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
  InnovativeTeam.findByIdAndRemove(id)
    .then((team) => {
      if (!team) {
        return res.status(404).send();
      }
      res.status(200).send({message:'data deleted successfully...'});
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};
