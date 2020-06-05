var mongoose = require("mongoose");



//App connection config
mongoose.set("useUnifiedTopology",true);
mongoose.connect("mongodb://localhost:27017/blog_demo",{useNewUrlParser:true});


//POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);


//USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
// 	email: "hermoine@potter.com",
// 	name: "Hermoine Granger"
// });

// newUser.posts.push({
// 	title: "How to bre polyjuice potion",
// 	content: "just kidding, go to class"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });


User.findOne({name: "Hermoine Granger"}, function(err, user){
	if(err){
		
	} else {
		
		user.posts.push({
			title: "3 Things I really Hate",
			content: "Voldemort, Voldemort, Voldemort"
		});
		user.save(function(err, user){
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});

// var newUser = new User({
// 	email: "charlie@brown.com",
// 	name: "Charlie Brown"
// });
// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Reflection On Apples",
// 	content: "They are delicious"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
//  		console.log(post);
//  	}
// });






