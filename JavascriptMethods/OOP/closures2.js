function classRoom() {
	var instructors = ["colt", "elie"];
	return {
		getInstructors: function(){
			return instructors;
		},
		addInstructor: function(instructor) {
			instructors.push(instructor);
			return instructors;
		}
	}
}

course1 = classRoom();
course1.getInstructors(); //["colt","elie"]
course1.addInstructor("ian");
course1.getInstructors(); //["colt","elie","ian"]

course2 = classRoom();
course2.getInstructors(); //not affected by course1

//Instructors variables is private, which means no one can alter it.