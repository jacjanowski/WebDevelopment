var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs"); //in order to not do: 'home.ejs' rather just 'home'.
app.get("/", function(req,res){
	res.render("home.ejs");
});


app.get("/fallinlovewith/:thing" , function(req,res){
	var thing = req.params.thing;
	res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function(req, res){
	var posts = [
		{title: "Post 1", author: "Jacob"},
		{title: "Post 2", author: "Babu"},
		{title: "Post 3", author: "Binks"},
	];
	
	res.render("posts.ejs", {posts: posts});
})

app.listen(3000, function() { 
  console.log('Server listening on port 3000! Status connected'); 
});