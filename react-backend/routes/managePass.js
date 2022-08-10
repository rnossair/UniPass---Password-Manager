const Account = require("../models/Account");


function managePass(app, Account){
    const encrypt = require("../Crypto/encryptLogic.js")
    const decrypt = require("../Crypto/decryptLogic.js");
    app.post("/api/submitPass", (req, res) => {
        /*let username = req.user.username;
        console.log(username);
        Account.find({username: username}, (err, data) => {
            if(err){res.json({error: err})}
    
        })*/
        let masterPass = req.body.masterPass;
        let pass = req.body.pass;
        encrypt(masterPass, pass);
        
    })
    app.post("/api/getPass", (req, res) => {
        let masterPass = req.body.masterPass;
        let salt = req.body.salt;
        let iv = req.body.iv;
        let encrypted = req.body.encrypted;
        decrypt(masterPass, salt, iv, encrypted);
    })
}

module.exports = managePass;