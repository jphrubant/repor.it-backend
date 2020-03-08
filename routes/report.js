const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Report = require("../models/report-model");
const User = require("../models/user-model");

// GET ALL REPORTS //
router.get('/', (req, res, next) => {
    Report
        .find()
        .then(allReports => {
            res
              .status(200)
              .json(allReports);
        })
        .catch(err => {
            res
            .status(400)
            .json(err); 
        });
});

// GET ONE REPORT BY ID //
router.get('/:id', (req, res, next) => {
  const {id} = req.params
  Report
    .findById(id)
    .then(oneReport => {
      res
        .status(200)
        .json(oneReport);
    })
    .catch(err => {
      res
        .status(400)
        .json(err); 
    });
});

// CREATE A REPORT//
router.post('/', (req, res, next) => {
    const {role, motivation, type, space, description, time, date, location, user} = req.body;
    Report
        .create({role, motivation, type, space, description, time, date, location, user})
        .then(newReport => {
            res
              .status(201)
              .json(newReport); 
              User.findByIdAndUpdate(
                user,
                { $push: { reports: newReport._id} },
                { new : true }
                )
              .then( response => {
                console.log("response", response);
              } )
              .catch( err => {
                console.log("error time", err);
            })
        })
        .catch(err => {
            res
            .status(500)
            .json(err); 
        });
});

// UPDATE A REPORT //
router.put('/:id', (req, res, next) => {
    const {id} = req.params;
    const {role, motivation, type, space, description, time, date, location} = req.body.role;
    Report
        .findByIdAndUpdate(id, {role, motivation, type, space, description, time, date, location})
        .then(() => {
            res
              .status(200)
              .json({message: `The report IDed ${id} was updated successfully`}); 
        })
        .catch(err => {
            res
            .status(501)
            .json(err);
        });
});

// DELETE A REPORT //
router.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    Report
        .findByIdAndRemove(id)
        .then(() => {
            res
              .status(202)
              .json({message: `Report IDed ${id} removed successfully`});
        })
        .catch(err => {
            res
              .status(500)
              .json(err);
        });
});

module.exports = router;