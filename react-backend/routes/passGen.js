var generatePassword = require("password-generator");
var express = require('express');
var router = express.Router();


router.post("/", (req, res) => {
    console.log("hi")
    console.log("body:", req.body);
    let count = req.body.count || 5;
    let passLength = req.body.passLength || 12;
    let passArr = [];
    for(i = 0; i < count; i++){
        passArr.push(generatePassword(passLength, false));
    }
    res.send({passwords: passArr});
})
module.exports = router;