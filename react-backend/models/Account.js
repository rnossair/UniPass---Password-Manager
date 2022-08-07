const Schema = require("mongoose").Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require("mongoose");

const Account = new Schema({
    passwords: [{name: String, password: String}]
  });
  
  Account.plugin(passportLocalMongoose);
  
  module.exports = mongoose.model('Accounts', Account);