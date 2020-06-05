function Person(name) {
	this.name = name;
	this.sayHi = function() {
		return "hi " + this.name;
	}
}

//insufficient use. lets attach to every object by putting it on a prototype
elie = new Person("elie");
elie.sayHi();  //hi elie


//prototype

function Person(name){
	
	this.name = name;
}

Person.prototype.sayHi = function(){
	return "Hi " + this.name;
}


