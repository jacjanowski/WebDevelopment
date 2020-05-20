
// var request = require('request');
// request('http://www.google.com', function(error, response, body){
// 	if(error){
// 		console.log("SOMETHING WENT WRONG");
// 		 console.log(error);	
// 	}else {
// 		if(statusCode == 200){
// 			//IT WORKED
// 			console.log(body);
// 		}
// 	}
// })

//Using arrow function (=> instead of 'function')
var request = require('request');
request('https://jsonplaceholder.typicode.com/users/1', (error, response, body) =>{

	
	if(!error && response.statusCode == 200) {
		const parsedData = JSON.parse(body);
		console.log(parsedData['name'] + ' lives in ' + parsedData.address.city);
		//OR we can do....
		console.log(`${parsedData.name} lives in ${parsedData.address.city}`);

	}
})