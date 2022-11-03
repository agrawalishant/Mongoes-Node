const Team = require("../model/team_model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var teamObj = new Team({
    title: req.body.title,
    image: `${url}${req.file.path}`,
    alt: req.body.alt,
    description: req.body.description,
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
    Team.find().then(
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
  Team.findById(id)
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
  Team.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      image: `${url}${req.file.path}`,
        alt: req.body.alt,
        description: req.body.description,
    },
    { new: true }
  )
    .then((team) => {
      res.status(200).send({message:'data updated successfully.....',data:team});
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:"id not found"});
  }
  Team.findByIdAndRemove(id)
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
