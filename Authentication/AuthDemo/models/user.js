var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

//Adds libraries and function from the package to the userSchema.
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);