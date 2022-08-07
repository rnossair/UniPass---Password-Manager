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
         
      app.post('/api/login', passport.authenticate('local', { failureRedirect: '/api/failLogin', failureFlash: false }), function(req, res) {
        res.send('Approved');
      });
      app.get("/api/failLogin", (req, res) => {
        res.send("Not approved");
    })
    app.get('/api/logout', function(req, res) {
      req.logout(function(err) {
        if (err) { return next(err); }
        res.send({result: "Logged out"});
      });
      
    });   
    app.get("/api/authCheck", function(req, res){
        console.log(req.isAuthenticated())
        if(req.isAuthenticated()){
            res.send({result: "Approved"})
        }
        else{
            res.send({result:"Not approved"})
        }
        
    })

}