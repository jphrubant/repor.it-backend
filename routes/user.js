const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/user-model");

// GET CURRENT USER//
router.get('/:id', (req, res, next) => {
    const {id} = req.params;
    User
        .findById(id)
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

// UPDATE A USER //
router.put('/:id', (req, res, next) => {
    const {id} = req.params;
    const {email, dateOfBirth, sex, sexualOrientation, ethnicity, nationality} = req.body;
    User
        .findByIdAndUpdate(id, {email, dateOfBirth, sex, sexualOrientation, ethnicity, nationality}, {new: true})
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
              .json({message: `User IDed ${id} was removed successfully`});
        })
        .catch(err => {
            res
              .status(500)
              .json(err);
        });
});

module.exports = router;