// ***************** State *******************

// ************ f(MODIFY-state) **************
function checkForToken(callback){
 
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/users/token',
		success: function(data){
			callback(data)
			console.log(data);
		},
		error: function(data){
			console.log('User not signed in')
			
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
	
	console.log('log out user called ')
	let userId = userTokenId;

	$.ajax({
		type: 'DELETE',
		url: `http://localhost:8080/users/logout/${userId}`,
		success: function(){
			location.reload();
			console.log('reloaded? ')
			checkForToken();

		},
		error: function(){}
	});
};

function 	submitQuery(query){
	console.log(query);
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/topics/query',
		data: {
			theme: query
		},
		success: function(data){
			renderQueries(data)

		},
		error: function(){
			console.log("query didn't work")
		}
	})
};

// ************ f(RENDER-state) **************

function displayQuestion(question){
	$('#displayTopics').append('<div class="box">'+ question +'</div>');

};

function displaySession(session){
	let questionsArray = [];
	$.map(session.questions, question => {
		questionsArray.push(question);
	});

	let sessionElement = 	'<div class="box"><h3> Theme: </h3>' + '<br>' + session.theme + '<br>' +
		'<h3> Session Introduction: </h3>' + '<br>' + session.introduction + '<br>' +
		'<h3> Keywords: </h3>' + '<br>' + session.keywords + '<br>' +
		'<h3> Questions: </h3>' + '<br></div>';

	$('#displayTopics').append(sessionElement);

	for (let i = 0; i < questionsArray.length; i++){
		$('#displayTopics').append(questionsArray[i] + '<br>');
	};


	// $('#displayTopics').append(	questionsArray);

};

function displayContent(){
	console.log('display Content Fired')
	$('#logOut, #profileTab, #logIn, #signUp').toggleClass('is-hidden');
};

function renderQueries(searchResults){
	console.log("search results: ");

	for(let i = 0; i < searchResults.length; i++){
		console.log(searchResults[i]);
		displaySession(searchResults[i]);
	}


};
// ************ Event Listeners **************

// Check if user is logged in 
$(function(){
	checkForToken(displayContent)
});

// Get a random question from the Db
$('#getOneQuestion').on('click', function(){
	$('#displayTopics').empty();
	getOneQuestion(displayQuestion);
});


// Get random session from the Db
$('#getOneSession').on('click', function(){
	$('#displayTopics').empty();
	getWholeSession(displaySession);
});

// Search db for query

$('#topicSearch').on('submit', function(e){
	e.preventDefault();
	$('#displayTopics').empty();
	let query = $('#queryInput').val();
	
	submitQuery(query);

});


// logout the user
$('#logOut').on('click', function(){
	checkForToken(logOutUser);
})







