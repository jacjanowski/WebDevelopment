var express = require("express");
var app = express();


app.get("/", function(req, res){
	res.send("Hi there welcome to my assignment");
});
app.listen(3000, function() { 
  console.log('Server listening on port 3000! Status connected'); 
});

app.get("/speak/:animal", function(req,res){
	var animal = req.params.animal.toLowerCase();
	var sounds = {
		pig: "oink",
		cow: "moo",
		cricket: "chrip",
		cat: "meowwww",
		fish: "..."
	}
	var sound = sounds[animal];
	res.send("The " + animal + " says '" + sound + "' ");
});


app.get("/repeat/:word/:number", function(req,res){
	var word = req.params.word;
	var num = Number(req.params.number);
	var result = "";
	for(var i = 0; i < num; i++){
		result += word + " ";
	}
	res.send(result);
});
	


app.get("*", function(req,res){
	res.send("Sorry, page not found.. What are you doing with your life?");
})


