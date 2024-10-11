
//comment.controller sisältää kommenttien luomisen ja hakemisen tietokannasta

const db = require("../models");
const Comment = db.Comment;

exports.create = (req, res) => {
  if (!req.body.text) {
    res.status(400).send({
      message: "Content cannot be empty", // virhe jos sisältö on tyjä
    });
    return;
  }

  // luodaan uusi kommentti
  const comment = {
    text: req.body.text,
    tutorialId: req.params.tutorialId,
  };

  // tallennetaan tietokantaan
  Comment.create(comment)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message })); // virhe jos tallennus ei onnistu
};


//haetaan kaikki kommentit tietokannasta
exports.findAll = (req, res) => {
  Comment.findAll({
    where: { tutorialId: req.params.tutorialId },
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message })); // virhe jos hakeminen ei onnistu
};
