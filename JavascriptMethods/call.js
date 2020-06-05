var person = {
	
	firstName: "Jacob",
	sayHi: function(){
		
		return "Hi " + this.firstName;
	},
	
	determineContext: function() {
		return this === person;
	},
	dog: {
		
		sayHello: function(){
			return "Hello " + this.firstName;
		},
		determineContext: function(){
			return this === person;
		}
		
	}
	
	
}
//USING CALL WORKED! Notice that we do NOT invoke sayHello or determineContext

person.sayHi();	// "Hi Jacob"
person.determineContext(); //true

person.dog.sayHello.call(person); //"Hello Jacob"
person.dog.determineContext.call(person); //true


