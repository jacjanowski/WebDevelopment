var express = require("express");
var router = express.Router({mergeParams: true}); //to enable ID to be rememebered when merging different routes.
var Campground = require("../models/campground");
var Comment  = require("../models/comment");
var middleware = require("../middleware");

//comments new 
router.get("/new", middleware.isLoggedIn, function(req,res){
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
router.post("/",middleware.isLoggedIn, function(req,res){
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
					req.flash("error", "something went wrong")
					console.log(err);
				} else {
					//add username and id to comments
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//then save comment.
					comment.save();
					
					
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully added comment!");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	
});

//comments edit routes
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
	
});

//comment update routes
router.put("/:comment_id",middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	

});

//comment delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success","Comment deleted.")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});



module.exports = router;