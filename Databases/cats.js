var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

mongoose
  .connect('mongodb://localhost/cat_app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });
//adding a new cat to the DB


var catSchema = new mongoose.Schema({
	name: String,
	age: Number, 
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//Now, each Cat has a name, age, and temperament.
//Crud


// var george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 7, 
// 	temperament: "Evil"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("something went wrong....");
// 	} else {
// 		console.log("Saved a cat to the DB!");
// 		console.log(cat);
// 	}
// });

//retreive all cats from the DB and consol.log each one
//cRud

Cat.find({}, function(err, cats){
	if(err){
		console.log("Uh oH.... ERROR");
		console.log(err);
	} else {
		console.log("All the Cats.....");
		console.log(cats);
	}
});

Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, newCat){
	if(err){
		console.log(err);
		console.log("we have an issue");
	} else {
		console.log(newCat);
	}
});




