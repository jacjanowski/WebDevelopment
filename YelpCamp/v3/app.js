var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	seedDB = require("./seeds");




mongoose.connect("mongodb://localhost/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
//seedDB();

// //SCHEMA SETUP
// var campgroundSchema = new mongoose.Schema({
// 	name: String,
// 	image: String,
// 	description: String
// });

// var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
	
// 	name: "Granite Hill",
// 	image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2c7dd39448cc_340.jpg",
// 	description: "This is a huge hill with no bathrooms and it's getting lonely up here..."
// 	}, function(err, campground){
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log("Newly created campground!");
// 			console.log(campground);
// 		}
// 	});


	
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){

	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds:allCampgrounds}); 
		}
	})
	//res.render("campgrounds", {campgrounds: campgrounds}); //first anything we wanna name it, then the data we wanna use
});

app.post("/campgrounds", function(req,res){
	//get data from the form and add to campgrounds array
	//redirect back to campgrounds page.
	
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image:image, description: desc};

	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	})
	//campgrounds.push(newCampground);
	
});

app.get("/campgrounds/new", function(req,res){
	res.render("new.ejs");
});

//SHOW - shows info about one specific campground
app.get("/campgrounds/:id", function(req,res){
	//find the campground with the provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
	
});

app.listen(3000, function(){
	console.log("PROGRAM IS NOW RUNNING...");
});