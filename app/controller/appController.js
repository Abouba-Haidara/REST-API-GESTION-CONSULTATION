"use strict";
// on inclut d'abord  le model
var Medecin = require("../model/medecin.model.js");

// Afficher toute la liste de medecins dans la base de données
exports.list_all_medecins = function (req, res) {
  Medecin.getAllMedecins(function (err, medecin) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", medecin);
    res.send(medecin);
  });
};

// Créer une nouvelle medecin
exports.create_a_medecin = function (req, res) {
  var new_medecin = new Medecin(req.body);
  //handles null error
  if (new_medecin.nom == "" || new_medecin.prenom == "" || new_medecin.telephone == "" || new_medecin.adresse == "") {
    res.status(400).send({
      error: true,
      message: "Please provide medecin/status"
    });
  } else {
    Medecin.create_a_medecin(new_medecin, function (err, medecin) {
      if (err) res.send(err);
      res.json(medecin);
    });
  }
};

// Chercher un medecin avec son id
exports.read_a_medecin = function (req, res) {
  Medecin.getMedecinById(req.params.medecinId, function (err, medecin) {
    if (err) res.send(err);
    res.json(medecin);
  });
};

// mettre à jour les données d'un medecin
exports.update_a_medecin = function (req, res) {
  Medecin.updateById(req.params.taskId, new Medecin(req.body), function (err, medecin) {
    if (err) res.send(err);
    res.json(medecin);
  });
};

// Supprimer un medecin
exports.delete_a_medecin = function (req, res) {
  Medecin.remove(req.params.medecinkId, function (err, medecin) {
    if (err) res.send(err);
    res.json({
      message: "Task successfully deleted",
      me: medecin
    });
  });
};