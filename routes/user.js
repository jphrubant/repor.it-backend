const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/user-model");

// GET ONE USER //
router.get('/:id', (req, res, next) => {
    const {id} = req.params;
    User
        .findById(id)
        .populate('reports')
        .then(oneUser => {
            res
              .status(200)
              .json(oneUser);
        })
        .catch(err => {
            res
            .status(400)
            .json(err); 
        });
});

// CREATE A USER//
router.post('/', (req, res, next) => {
    const {email, password, dateOfBirth, sex, sexualOrientation, ethnicity, nationality} = req.body;
    User
        .create({email, password, dateOfBirth, sex, sexualOrientation, ethnicity, nationality, reports:[]})
        .then(newUser => {
            res
              .status(201)
              .json(newUser); 
        })
        .catch(err => {
            res
            .status(500)
            .json(err); 
        });
});

// UPDATE A USER //
router.put('/:id', (req, res, next) => {
    const {id} = req.params;
    const {email, password, dateOfBirth, sex, sexualOrientation, ethnicity, nationality} = req.body;
    User
        .findByIdAndUpdate(id, {email, password, dateOfBirth, sex, sexualOrientation, ethnicity, nationality})
        .then(() => {
            res
              .status(200)
              .json({message: `The user IDed ${id} was updated successfully`}); 
        })
        .catch(err => {
            res
            .status(501)
            .json(err);
        });
});

// DELETE A USER //
router.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    User
        .findByIdAndRemove(id)
        .then(() => {
            res
              .status(202)
              .json({message: `User ${id} removed successfully`});
        })
        .catch(err => {
            res
              .status(500)
              .json(err);
        });
});

module.exports = router;