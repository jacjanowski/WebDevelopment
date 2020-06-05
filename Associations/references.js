var mongoose = require("mongoose");



//App connection config
mongoose.set("useUnifiedTopology",true);
mongoose.connect("mongodb://localhost:27017/blog_demo_2",{useNewUrlParser:true});


//POST - title, content
// var postSchema = new mongoose.Schema({
// 	title: String,
// 	content: String
// });

var Post = require("./models/post");
var User = require("./models/user");


// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// });

Post.create({
	title: "How to cook the best burger pt 4",
	content: "flannigan"
}, function(err, post) {
	User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
		if(err){
			console.log(err);
		} else {
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err){
					console.log(err);
				} else {
					console.log(data);
				}
			});
		}
	});
});

//Find foundUser
//find all posts for that userSchema.

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else{
// 		console.log(user);
// 	}
// });





