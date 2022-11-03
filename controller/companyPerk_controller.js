const CompanyPerk = require("../model/companyPerk_model");
var { ObjectID } = require("mongodb");

exports.create = (req, res) => {
    var companyPerk = new CompanyPerk({
        mainTitle: req.body.mainTitle,
        title: req.body.title,
        className: req.body.className
    });
    companyPerk.save().then(
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
    CompanyPerk.find().then(
        (result) => {
            res.status(200).send(result);
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
    CompanyPerk.findById(id)
        .then((result) => {
            if (!result) {
                return res.status(404).send();
            }
            res.status(200).send(result);
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
    CompanyPerk.findByIdAndUpdate(
        id,
        {
            mainTitle: req.body.mainTitle,
            title: req.body.title,
            className: req.body.className
        },
        { new: true }
    )
        .then((result) => {
            if (!result) {
                return res.status(404).send();
            }
            //   res.send(review);
            res.status(200).send({
                message: "your data successfully updated....",
                data: result,
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
    CompanyPerk.findByIdAndRemove(id)
        .then((result) => {
            if (!result) {
                return res.status(404).send();
            }
            //   res.send(review);
            res.status(200).send({ message: "data deleted successfully..." });
        })
        .catch((e) => {
            res.status(400).send();
        });
};
