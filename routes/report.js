const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Report = require("../models/report-model");

// GET ALL REPORTS //
router.get('/', (req, res, next) => {
    Report
        .find()
        //.populate('user')
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

// CREATE A REPORT//
router.post('/', (req, res, next) => {
    const {motivation, type, space, description, time, date, location, user} = req.body;
    Report
        .create({motivation, type, space, description, time, date, location, user})
        //.populate('user')
        .then(newReport => {
            res
              .status(201)
              .json(newReport); 
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
    const {motivation, type, space, description, time, date, location, user} = req.body;
    Report
        .findByIdAndModify(id, {motivation, type, space, description, time, date, location, user})
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