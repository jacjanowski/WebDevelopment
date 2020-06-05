var express = require("express"),
 app = express(),
 bodyParser = require("body-parser"),
 mongoose = require("mongoose"),
	passport = require("passport"),
	LocalyStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds");




mongoose.connect("mongodb://localhost/yelp_camp_v6", {
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
app.use(express.static(__dirname + "/public"));
//seedDB();


//passport Configuration
app.use(require("express-session")({
		secret: "Rusty wins cutest dogs",
		resave: false,
		saveUninitialized: false
	}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalyStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//apply the middleware to every route: make "currentUser" be known to all routes.
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});









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

//Index routes - show all campgrounds
app.get("/campgrounds", function(req, res){

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
	res.render("campgrounds/new");
});

//SHOW - shows info about one specific campground
app.get("/campgrounds/:id", function(req,res){
	//find the campground with the provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
	
});

//====================================
//comment routes
//====================================


app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
	//find campground by id, then render it.
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});

});


app.post("/campgrounds/:id/comments",isLoggedIn, function(req,res){
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
					
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	
});
	

//====================================
//Auth routes
//====================================

app.get("/register", function(req,res){
	res.render("register");
});

//handle sign up logic

app.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});


//show login form
app.get("/login", function(req,res){
	res.render("login");
});

//handling login logic
app.post("/login", passport.authenticate("local", 
	 {
		successRedirect: "/campgrounds", 
		failureRedirect: "/login"
}), function(req,res){
	
});





//logout route
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}



app.listen(3000, function(){
	console.log("PROGRAM IS NOW RUNNING...");
});