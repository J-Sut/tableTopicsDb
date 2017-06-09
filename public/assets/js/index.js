// ***************** State *******************

// ************ f(MODIFY-state) **************
function checkForToken(callback){
	console.log('check for token fired')
 
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/users/token',
		success: function(data){
			callback(data)
			console.log(data);
		},
		error: function(data){
			console.log('Token not found')
			
		}
	});	
}

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

function logOutUser(userTokenId){
	let userId = userTokenId;

	$.ajax({
		type: 'DELETE',
		url: `http://localhost:8080/users/logout/${userId}`,
		success: function(){
			checkForToken();
			displayContent();

		},
		error: function(){}
	});
};
// ************ f(RENDER-state) **************

function displayQuestion(question){
	console.log('question: ' + question);

	$('#displayTopics').empty();
	$('#displayTopics').append(question);

};

function displaySession(session){
	console.log(session);

	let questionsArray = [];
	$.map(session.questions, question => {
		questionsArray.push(question);
	});

	$('#displayTopics').empty().append(
		'<h3> Theme: </h3>' + '<br>' + session.theme + '<br>' +
		'<h3> Session Introduction: </h3>' + '<br>' + session.introduction + '<br>' +
		'<h3> Keywords: </h3>' + '<br>' + session.keywords + '<br>' +
		'<h3> Questions: </h3>' + '<br>' 
		);

	for (let i = 0; i < questionsArray.length; i++){
		$('#displayTopics').append(questionsArray[i] + '<br>');
	};


	// $('#displayTopics').append(	questionsArray);

};

function displayContent(){
	console.log('display Content Fired')
	$('#logOut, #profileTab, #logIn, #signUp').toggleClass('is-hidden');
};


// ************ Event Listeners **************

// Check if user is logged in 
$(function(){
	console.log('init token check fired')
	checkForToken(displayContent)
});

// Get a random question from the Db
$('#getOneQuestion').on('click', function(){
	getOneQuestion(displayQuestion);
});


// Get random session from the Db
$('#getOneSession').on('click', function(){
	getWholeSession(displaySession);
});

// logout the user
$('#logOut').on('click', function(){
	checkForToken(logOutUser);
})