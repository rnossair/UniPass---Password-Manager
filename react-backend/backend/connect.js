require("dotenv").config();
const mongoose = require("mongoose");
async function main(callback) {
    
    const URI = process.env.MONGO_URI; // Declare MONGO_URI in your .env file
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    console.log('Could not connect to mongodb');
  }
  else{console.log("connection successful")}
});
}

module.exports = main;