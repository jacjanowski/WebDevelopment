function Car(make, model,year){
	this.make = make;
	this.model = model;
	this.year = year;
	
	this.numWheels = 4;
}

function Motorcycle(make,model,year){
	//using call
	//Created from Motorcycle function when 'new' is used.
	Car.call(this,make,model,year); //first value('this') refers to what we want the object 'this' to be. 
	
	this.numWheels = 2;
}

function Motorcycle(make,model,year){
	//using apply
	Car.apply(this, [make,model,year]); 
	
	this.numWheels = 2;
}

function Motorcycle(make,model,year){
	//even better using apply with arguments
	Car.apply(this, arguments); 
	
	this.numWheels = 2;
}
