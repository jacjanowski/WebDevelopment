var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
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
router.post("/", middleware.isLoggedIn, function(req,res){
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
router.get("/new", middleware.isLoggedIn, function(req,res){
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


//EDIT Campground route

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){

	
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});

	});

	
});



//UPDATE Campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and update the correct campground
	
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			//redirect somewhere(show page)
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
	
	
});

//DESTROY Campground router
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;



