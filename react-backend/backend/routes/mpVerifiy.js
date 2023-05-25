const crypto = require("crypto");
require("dotenv").config();
function mpVerify(app, Account){
    app.post("/api/mpverify", (req, res) => {
        let username = req.user.username;
        let mp = req.body.mp;
        Account.findOne({username: username}, (err, data) =>{
            if(err){console.log(err)}
            crypto.pbkdf2(mp, data.mp.salt, 100000, 64, "sha512", (err, hash) => {
                if(hash.toString("hex") === data.mp.hash){
                    res.json({result: "Success"});
                    return;
                }
                else{
                    res.json({result: "Failure"});
                }
            })
        })
    })
}
module.exports = mpVerify;