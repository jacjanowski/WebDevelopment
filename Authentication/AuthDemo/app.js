var express = 				require("express"),
	mongoose = 				require("mongoose"),
	passport = 				require("passport"),
	bodyParser = 			require("body-parser"),
	User =					require("./models/user"),
	LocalStrategy = 		require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");

var app = express();


mongoose.connect("mongodb://localhost/auth_demo_app", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
		secret: "I have unwraveled the secret passsage!",
		resave: false,
		saveUninitialized: false
	}));
//NEED THESE TWO LINES WHENEVER USING PASSPORT
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
//Reading in the session and decoding it. Then encoding it and saving into session.
//Comes from passportLocalMongoose functoins.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req,res){
	res.render("home");
});


//isLoggedIn is for checking if user is signed in.
app.get("/secret",isLoggedIn, function(req,res){
	res.render("secret");
});


//Auth Routes


//Show sign up form
app.get("/register", function(req,res){
	res.render("register");
});

//handle user sign in
app.post("/register", function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
			res.redirect("/secret");
		});
	});
});

//login routes
//render login form
app.get("/login", function(req,res){
	
	res.render("login");
	
});


//logout
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/");
});

//login logic
//middleware
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req,res){
	
});

//check if user is alive

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
	
}





app.listen(3000, function(){
	console.log("server has started......");
});