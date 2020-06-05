"user strict";
var sql = require("./db.js"); // on inclut la connexion avec la base données mysql

//Medecin object constructor
var Medecin = function (medecin) {
  this.nom = medecin.nom;
  this.prenom = medecin.prenom;
  this.telephone = medecin.telephone;
  this.adresse = medecin.adresse;
  this.status = medecin.status = 1;
  this.created_at = new Date();
};

// Insertion de medecin dans la base données
Medecin.create_a_medecin = function (nom, prenom, telephone, adresse, status, result) {
  sql.query(
    "INSERT INTO medecin set ? ",
    nom,
    prenom,
    telephone,
    adresse,
    status,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

//Recherche une medecin par son id dans la base données
Medecin.getMedecinById = function (medecinId, result) {
  sql.query("Select * from medecin where id = ? ", medecinId, function (
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// Récuperer toutes les medecins dans la base données
Medecin.getAllMedecins = function (result) {
  sql.query("Select * from medecin ", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("tasks : ", res);

      result(null, res);
    }
  });
};

// mettre à jour la tâche dont l'id est passé en paramettre dans la base données
Medecin.updateById = function (id, medecin, result) {
  sql.query(
    "UPDATE medecin SET nom = ?, prenom = ?, telephone = ?, adresse = ?  WHERE id = ?",
    [medecin.nom, medecin.prenom, medecin.telephone, medecin.adresse, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

//Supprimer le medecin dont l'id est passé en paramettre dans la base données
Medecin.remove = function (id, result) {
  sql.query("DELETE FROM medecin WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Medecin; //exporter l'objet medecin dans les autres modules