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
    
//requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes 		 = require("./routes/index");



mongoose.connect("mongodb://localhost/yelp_camp_v8", {
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

//seed the DB

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




app.use("/", indexRoutes);
app.use("/campgrounds" ,campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(3000, function(){
	console.log("PROGRAM IS NOW RUNNING...");
});