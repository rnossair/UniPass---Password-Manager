const passport = require("passport");
module.exports = function (app, Account) {
    app.post('/api/register', function(req, res, next) {
        console.log('registering user');
        console.log(req.body)
        Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
          if (err) {
            console.log('error while user register!', err);
            return next(err);
          }
      
          console.log('user registered!');
      
          res.send({result:"Successfully registered!"})
        });
      });
         
   
    app.get("/api/getUser", function(req,res){
      console.log(req.user);
      res.send({username: req.user.username});
      //res.send({username: 3})
    })


}