function average(scores) {

	var total = 0;
	
	scores.forEach(function(score) {
		total += score;
	});
	
	var avg = total/scores.length;
	
	return Math.round(avg);
}

console.log("Scores for the easy classes:");
var scores1 = [90,98,89,100,100,86,94];
console.log(average(scores1));

console.log("Scores for the harder classes: ");
var scores2 = [40,65,77,82,80,54,73,63,95,49];
console.log(average(scores2));