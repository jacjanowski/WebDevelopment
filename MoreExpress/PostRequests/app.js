var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var friends = ["jacob", "colt", "tony", "becca", "alice"];


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
	res.render("home");
})

app.post("/addfriend", function(req,res){
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	res.redirect("/friends");
	res.send("YOU HAVE REACHED THE POST ROUTE! you added ur friend " + newFriend);
	
})

app.get("/friends", function(req, res){
	
	res.render("friends", {friends: friends})
})

app.listen(3000, function(){
	console.log("Server initiated!!!!!!");
})