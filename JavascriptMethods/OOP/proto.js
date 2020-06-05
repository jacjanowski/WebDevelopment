function Person(name) {
	this.name = name;
}


var elie = new Person("Elie");
var colt = new Person("colt");
Person.prototype.isInstructor = true;

elie.isInstructor; //true
colt.isInstructor; //true
