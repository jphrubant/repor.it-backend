const express = require(express);
const mongoose = require('mongoose');
const router = express.Router();
const createError = require("http-errors");
const Report = require("../models/report-model");

router.get('/report', (req, res, next) => {
    Report
        .find()
        .populate('user')
        .then(allReports => {
            res
              .status(200)
              .json(allReports);
        })
        .catch(err => {
            res
            .status(400)
            .json(err); 
        })
});

router.post('/report', (req, res, next) => {
    const {motivation, type, space, description, time, date, location, user} = req.body;
    Report
        .create({motivation, type, space, description, time, date, location, user})
        .then(newReport => {
            res.json(newReport); //<-- set correct success message
        })
        .catch(err => {
            res.json(err); // <-- set correct error message
        })
});

router.put('/report/:id', (req, res, next) => {
    const {id} = req.params;
    const {motivation, type, space, description, time, date, location, user} = req.body;
    Report
        .findByIdAndUpdate(id, {motivation, type, space, description, time, date, location, user})
        .then(() => {
            res
              .status(200)
              .json({message: `The report IDed ${id} was updated successfully`}); 
        })
        .catch(err => {
            res.json(err);
        })
});

router.delete('/report/:id', (req, res, next) => {
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
        })
});

module.exports = router;