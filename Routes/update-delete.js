const express = require('express');
const router = express.Router({mergeParams: true});
const mysqlConnection = require('../database');
const verify = require("../verifyToken");
const verifyrest = require("../verifyTokenRest");





router.post("/update", verify, (req, res) => {
    mysqlConnection.query(
        "UPDATE notetaker set Name = ?,Priority = ?, note = ? WHERE NoteID= ?",
        [req.body.Name, req.body.Priority, req.body.note, req.params.id], (err, rows, fields) => {
            !err ? res.redirect("/view") : console.log(err);
        }
    );
});


router.patch("/update", verifyrest, (req, res) => {
    mysqlConnection.query(
        "UPDATE notetaker set Name = ?,Priority = ?, note = ? WHERE NoteID= ?",
        [req.body.Name, req.body.Priority, req.body.note, req.params.id], (err, rows, fields) => {
            !err ? res.json(rows) : res.json({message: err});
        }
    );
});


  


router.get("/delete", verify, (req, res) => {
    mysqlConnection.query(
        "DELETE FROM notetaker WHERE NoteID = ?", [req.params.id], (err, rows, fields) => {
            !err ? res.redirect("/view") : console.log(err);
        }
    );
});





router.delete("/delete", verifyrest, (req, res) => {
    mysqlConnection.query(
        "DELETE FROM notetaker WHERE NoteID = ?", [req.params.id], (err, rows, fields) => {
            !err ? res.json(rows) : res.json({message: err});
        }
    );
});

module.exports = router;