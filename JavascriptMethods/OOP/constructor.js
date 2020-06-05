function Dog(name,age){
	this.name = name;
	this.age = age;
	this.bark = function(){
		console.log(this.name + " just barked!");
	}
}

var rusty = new Dog("Rusty", 13);
var fido = new Dog("Fido", 3);

rusty.bark();
fido.bark();