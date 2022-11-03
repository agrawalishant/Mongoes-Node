const Footer = require("../model/footer_model");
var { ObjectID } = require("mongodb");

// var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
    var footer = new Footer({
        title: req.body.title,
        links: req.body.links,
        valueArray: req.body.valueArray,
        icon: req.body.icon,
        iconValue: req.body.iconValue
    });
    footer.save().then(
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
    Footer.find().then(
        (footer) => {
            res.status(200).send(footer);
        },
        (e) => {
            res.status(400).send({ message: e.message });
        }
    );
};

exports.findOne = (req, res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: "id not found" });
    }
    Footer.findById(id)
        .then((footer) => {
            if (!footer) {
                return res.status(404).send();
            }
            res.status(200).send(footer);
        })
        .catch((e) => {
            res.status(400).send({ message: e.message });
        });
};

exports.update = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: "id not found" });
    }
    Footer.findByIdAndUpdate(
        id,
        {
            title: req.body.title,
            links: req.body.links,
            valueArray: req.body.valueArray,
            icon: req.body.icon,
            iconValue: req.body.iconValue
        },
        { new: true }
    )
        .then((footer) => {
            if (!footer) {
                return res.status(404).send();
            }
            //   res.send(review);
            res.status(200).send({
                message: "your data successfully updated....",
                data: footer,
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
    Footer.findByIdAndRemove(id)
        .then((footer) => {
            if (!footer) {
                return res.status(404).send();
            }
            //   res.send(review);
            res.status(200).send({ message: "data deleted successfully..." });
        })
        .catch((e) => {
            res.status(400).send();
        });
};
