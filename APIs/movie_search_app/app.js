var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("search");
});



app.get("/results", function(req, res){
	var query = req.query.search;
	var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
	request(url,function(error,response,body){
			
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			// res.send(results["Search"][0]["Title"]);

			//res.send(results["Search"][0]["Title"]); --->//for just the title
			res.render("results", {data:data});
		}
		

	});
	
});

app.listen(3000, function() { 
  console.log('Movie app is launched'); 
});