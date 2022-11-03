const Home = require("../model/home_model");
var { ObjectID } = require("mongodb");

exports.create = (req, res) => {
  var home = new Home({
    title: req.body.title,
    description: req.body.description
  });

  home.save().then(
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
    Home.find().then(
    (home) => {
      res.status(200).send(home);
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
  Home.findById(id)
    .then((home) => {
      if (!home) {
        return res.status(404).send();
      }
      res.status(200).send(home);
    })
    .catch((e) => {
      res.status(400).send();
    });
};

exports.update = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Home.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description
    },
    { new: true }
  )
    .then((home) => {
      if (!home) {
        return res.status(404).send();
      }
      res.status(200).send({message:"your data successfully updated...",data:home});
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
  Home.findByIdAndRemove(id)
    .then((home) => {
      if (!home) {
        return res.status(404).send("data not found..");
      }
      res.status(200).send("data deleted successfully....");
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};
