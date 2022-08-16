const crypto = require("crypto");
require("dotenv").config();
function mpSubmit(app, Account){
    app.post("/api/mpsubmit", (req, res) => {
        let username = req.user.username;
        let mp = req.body.mp;
        let salt = crypto.randomBytes(64);
        salt = salt.toString("hex");
        Account.findOne({username: username}, (err, data) =>{
            if(err){console.log(err)}
            if(!data.mp.hash){
                crypto.pbkdf2(mp, salt, 100000, 64, "sha512", (err, hash) => {
                    if(!err){
                        data.mp.salt = salt;
                        data.mp.hash = hash.toString("hex");
                        data.save((err, data) => {
                            if(!err){
                                res.json({result: "Success"})
                            }
                        })
                    }
                    else{
                        res.json({result: "Failure"});
                    }
                })
            }
            else{
                res.json({result: "Mp already set"});
            }
        })
    })
}
module.exports = mpSubmit;