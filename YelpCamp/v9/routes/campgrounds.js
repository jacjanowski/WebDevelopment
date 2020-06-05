var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//Index routes - show all campgrounds
router.get("/", function(req, res){

	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user}); 
		}
	})
	//res.render("campgrounds", {campgrounds: campgrounds}); //first anything we wanna name it, then the data we wanna use
});

// CREATE route - add new campground to DB
router.post("/", isLoggedIn, function(req,res){
	//get data from the form and add to campgrounds array
	//redirect back to campgrounds page.
	
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image:image, description: desc, author:author};

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

//NEW route
router.get("/new", isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

//SHOW - shows info about one specific campground
router.get("/:id", function(req,res){
	//find the campground with the provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
	
});


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports = router;



