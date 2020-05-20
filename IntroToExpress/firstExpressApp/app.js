var express = require("express");
var app = express();

// "/" --> "Hi there"
app.get("/", function(req, res){
	res.send("hello from testing");
});

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});
// "/bye" --> "goodbye"
app.get("/bye", function(req,res){
	res.send("alright, goodbye");
});
// "/dog" --> "meow"

app.get("/dog", function(req,res){
	res.send("wOOOOFFFF");
});

app.get("/r/:subredditName", function(req,res){
	var subreddit = req.params.subredditName;
	res.send("welcome to the " + subreddit.toUpperCase() + " Subreddit!");
});

app.get("/r/:person/comments/:id/:title", function(req,res) {
	console.log(req.params);
	res.send("Welcome to a nested comments page");	
});

app.get("*", function(req,res){
		res.send("for any other links, this appears.");
});
