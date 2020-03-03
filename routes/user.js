const express = require(express);
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");

router.put('/user/:id', (req, res, next) => {
    const {id} = req.params

    User.findByIdAndUpdate

})


module.exports = router;