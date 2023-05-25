const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
function auth(app, Account) {
    passport.use(Account.createStrategy());
    
    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());   
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/api/logout', function(req, res) {
        req.logout(function(err) {
          if (err) { return next(err); }
          res.send({result: "Logged out"});
        });
        
      }); 
    app.post('/api/login', passport.authenticate('local', { failureRedirect: '/api/failLogin', failureFlash: false }), function(req, res) {
        res.send('Approved');
    });
    app.get("/api/failLogin", (req, res) => {
        res.send("Not approved");
    })
      
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
module.exports = auth;