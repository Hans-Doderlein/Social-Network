const mongoose = require("mongoose");

//connection to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/SocialNetworkDB");

module.exports = mongoose.connection;
