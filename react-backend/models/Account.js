const Schema = require("mongoose").Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require("mongoose");

const Account = new Schema({
    passwords: [{name: String, cipher: String, iv: String, salt: String}]
  });
  
  Account.plugin(passportLocalMongoose);
  
  module.exports = mongoose.model('Accounts', Account);