const Banner = require('../model/banner_model');
var { ObjectID } = require('mongodb');

var url = `https://therapidhiredev.herokuapp.com/`;

exports.create = (req, res) => {
  console.log("----",req.file)
  var banner = new Banner({
    title:req.body.title,
    image:`${url}${req.file.path}`,
    description:req.body.description,
    alt:req.body.alt,
  });
  console.log(req.body)
  banner.save().then((doc) => {
    (doc.isNew === false)
    res.status(200).send(doc);
  }, (e) => {
    res.status(500).json({ success: false, message: e.message })
  });
};

exports.findAll = (req, res) => {
    Banner.find()
  .then((banner) => {
    
     res.status(200).send(banner);
    }, (e) => {
      res.status(500).send(e);
    })
};

exports.findOne = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
     return res.status(404).send();
  }
  Banner.findById(id)
  .then((banner) => {
       if (!banner) {
           return res.status(404).send();
       }
       res.status(200).send(banner);
  }).catch((e) => {
     res.status(500).send();
  });
};


exports.delete = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    Banner.findByIdAndRemove(id).then((banner) => {
         if (!banner) {
            return res.status(404).send();
         }
         res.status(200).send({message:"data deleted successfully..."});
    }).catch((e) => {
      res.status(400).send();
    });
  };


  exports.update = (req, res) => {
      var bannerObj = {
        title:req.body.title,
        image:`${url}${req.file.path}`,
        description:req.body.description,
        alt:req.body.alt,
      }
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send({ message: "Id Not Found" });
    }
    Banner.findByIdAndUpdate(id,bannerObj, { new: true })
      .then((banner) => {
        res.status(200).send({ message: "your data successfully updated....", data: banner });
      }).catch((e) => {
        res.status(400).send({ message: e.message });
      })
  };
  