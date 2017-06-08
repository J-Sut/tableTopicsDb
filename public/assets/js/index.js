// ***************** State *******************

// ************ f(MODIFY-state) **************
function getOneQuestion(callback){
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/topics/question',
		success: function(data){
			callback(data);
		},
		error: function(data){
			console.log("get request error")
		}
	});		
};

function getWholeSession(callback) {

	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/topics/session',
		success: function(data){
			callback(data);
		},
		error: function(data){
			console.log("Get Session not working")
		}
	});		
}
// ************ f(RENDER-state) **************

function displayQuestion(question){
	console.log('question: ' + question);

	$('#displayTopics').empty();
	$('#displayTopics').append(question);

};

function displaySession(session){
	
	let questionsArray = [];
	$.map(session.questions, question => {
		questionsArray.push(question);
	});

	$('#displayTopics').empty();

	for (let i = 0; i < questionsArray.length; i++){
		$('#displayTopics').append(questionsArray[i] + '<br>');
	};


	// $('#displayTopics').append(	questionsArray);

};


// ************ Event Listeners **************
function gotQuestion(topic){
	console.log("we got it => " );
	console.log(topic)
}


$('#getOneQuestion').on('click', function(){
	getOneQuestion(displayQuestion);
});

$('#getOneSession').on('click', function(){
	getWholeSession(displaySession);
});