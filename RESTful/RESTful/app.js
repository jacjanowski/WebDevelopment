var express = require("express"),
	bodyParser = require("body-parser"),
	app = express(), 
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer");


//TITLE
//IMAGE URL
//BODY
//CREATED


//App connection config
mongoose.set("useUnifiedTopology",true);

mongoose.connect("mongodb://localhost:27017/blog_posts",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


//Mongoose/Model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String, 
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
	res.redirect("/blogs");
});

//take the blogs from the DB, and utilize it using the orange 'blogs'
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
	
});

//NEW route
app.get("/blogs/new", function(req, res){
	res.render("new");
});

//CREATE route
app.post("/blogs", function(req,res){
	//create blogs
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		}
		else {
			res.redirect("/blogs");
		}
	});
});


//SHOW route
app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

//EDIT route 
app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log(err);
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
	
});

//UPDATE route
app.put("/blogs/:id", function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//DELETE route
app.delete("/blogs/:id", function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
	
	
});




// Blog.create({
// 	title: "Test Blog",
// 	image: "https://pixabay.com/get/55e3d4444f53b10ff3d8992ccf2934771438dbf852547940722b78dd9644_340.jpg",
// 	body: "I wanna be here skating with this dude."
// });

//RESTful Routes
app.listen(3000, function(){
	console.log("PROGRAM IS NOW RUNNING...");
});