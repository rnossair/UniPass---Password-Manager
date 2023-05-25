const crypto = require("crypto");
require("dotenv").config();
function mpGet(app, Account){
    app.get("/api/mpget", (req, res) => {
        let username = req.user.username;
        Account.findOne({username: username}, (err, data) =>{
            if(err){console.log(err)}
            if(data.mp.hash){
                res.json({result: "Mp set"});
                return;
            }
            else{
                res.json({result: "Mp not set"});
                return;
            }
        })
    })
}
module.exports = mpGet;