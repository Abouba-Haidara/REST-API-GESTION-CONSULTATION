"use strict";
module.exports = function (app) {
  var medecinList = require("../controller/appController");

  // todoList Routes permet d'afficher la liste de medecin
  app.route("/medecins").get(medecinList.list_all_medecins).post(medecinList.create_a_medecin);

  // Pour afficher une medecin ou mettre à jour une medecin ou suprimer une medecin
  app
    .route("/medecin/:mdecinId")
    .get(medecinList.read_a_medecin)
    .put(medecinList.update_a_medecin)
    .delete(medecinList.delete_a_medecin);
};