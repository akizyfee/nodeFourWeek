var express = require('express');
var router = express.Router();
const User = require("../models/usersModel");

router.get('/', async function (req, res, next) {

    const user = await User.find()

    res.status(200).json({
        status: "success",
        user
    })
})
module.exports = router;