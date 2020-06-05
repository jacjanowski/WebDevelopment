function outer(a){
	
	return function inner(b) {
		//inner function is making use of the variable 'a',
		//which was defined in an outer function called "outer"
		//and by the time this is called, that outer function has returned 
		//this function called "inner" is a closure.
		return a + b;
	}
}


outer(5)(5);  //10

var storeOuter = outer(5);
storeOuter(10);	//15