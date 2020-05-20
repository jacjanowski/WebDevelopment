var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

	var campgrounds = [
		{name: "Pebble Creek", image: "https://pixabay.com/get/52e3d3404a55af14f1dc84609620367d1c3ed9e04e5074417c2c7bd4914bc5_340.png"}, 
		{name: "Granite Hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd39448cc_340.jpg"},
		{name: "Mt. Everest", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd39448cc_340.jpg"},
				{name: "Some place", image: "https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e5074417c2c7dd39448cc_340.jpg"}, 
		{name: "Camp Site", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e5074417c2c7dd39448cc_340.jpg"},
		{name: "Phillipines", image: "https://pixabay.com/get/52e3d5404957a514f1dc84609620367d1c3ed9e04e5074417c2c7dd39448cc_340.jpg"},
				{name: "Camping", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e5074417c2c7dd39448cc_340.jpg"}, 
		{name: "Forest", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254794076297cd79244_340.jpg"},
		{name: "Mt. Everest", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd39448cc_340.jpg"}
	];
	
	
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){

	
	res.render("campgrounds", {campgrounds: campgrounds}); //first anything we wanna name it, then the data we wanna use
});

app.post("/campgrounds", function(req,res){
	//get data from the form and add to campgrounds array
	//redirect back to campgrounds page.
	
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image:image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
	res.render("new.ejs");
});

app.listen(3000, function(){
	console.log("PROGRAM IS NOW RUNNING...");
});