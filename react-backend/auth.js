const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
function auth(app, Account) {
    passport.use(Account.createStrategy());
    
    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());   
    app.use(passport.initialize());
    app.use(passport.session());
 

}
module.exports = auth;