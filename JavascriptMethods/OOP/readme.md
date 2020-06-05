Recap
-------------
-Object Oriented Programming is a model based on objects constructed from a blueprint. We cuse OOP to write more mofular and shareable code.

-In languages that have built-in support for OOP, we call these blueprints "classes" and the objects created from them "instances"

-Since we don't have built-in class support in JavaScript, we mimic classes by using functions. These constructor functions create objects through the use of the 'new' keyword.

-We can avoid duplicated in multiple constructor functions by using call or apply.


Prototype
-----------------
-Every time the 'new' keyword is used, a link between the object created and the prototype property of the construcor is established -- this link can be accessed using '__proto__'

-The prototype object contains a protperty called construct, which points back to the constructor function.

-To share properties and methods for objects created by a constructor function, place them in the prototype as it is the most efficient.


Clousures
------------------
-Closure exists when an inner function makes use of variables declared in an outer function which has previously returned.

-Closure does not exist if you don not return an inner function and if that inner function does not make use of variables returned by an outer function.

-We can use closures to create private variables and write better code that isolates our logic and application.