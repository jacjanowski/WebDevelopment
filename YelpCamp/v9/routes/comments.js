var express = require("express");
var router = express.Router({mergeParams: true}); //to enable ID to be rememebered when merging different routes.
var Campground = require("../models/campground");
var Comment  = require("../models/comment");


//comments new 
router.get("/new", isLoggedIn, function(req,res){
	//find campground by id, then render it.
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});

});

//comments create
router.post("/",isLoggedIn, function(req,res){
	//look up campground using id
	//create new comments
	//connect new comment to campground
	//redirect campground show page
	
	Campground.findById(req.params.id,  function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					//add username and id to comments
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//then save comment.
					comment.save();
					
					
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	
});

//Middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports = router;