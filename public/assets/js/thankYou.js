/***************** State *****************/

/***************** f(Modify-State) *****************/

function one(number){
	let val = 1;
	let newNum = 0;

	if(number !== undefined){
		newNum = number;
	};

	val += newNum;

	return val;
}

function plus(num){
	let plusVal = 0;

	if (num !== undefined){
		plusVal = num;
	};

	return plusVal;
};

function two(){
	let twoVal = 2;

	return twoVal
};

function three(){
	let threeVal = 3;
	return threeVal;
};

/***************** f(Render-State) *****************/


/***************** Event Listeners *****************/

$('#challengeButton').on('click', function(){
	console.log("one is: " + one());
	console.log("two is: " + two());
	console.log("plus is: " + plus())

	console.log('plus(two()):' + plus(two()));


	console.log(
		"one(plus(two())): " +
		one(plus(two()))
	);
			
	console.log(
		"one(plus(three())): " +
		one(plus(three()))
	);
});



