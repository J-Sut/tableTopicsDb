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
	$('#displayTopics')
		.empty()
		.append('<h3 class="title is-3">'+ question +'</h3>')
	};

function displaySession(session){
	let questionsArray = [];
	$.map(session.questions, question => {
		questionsArray.push(question);
	});

let questionListElement = []


//got the questions in an array... 
	console.log(questionListElement)

	// $('#sessionMetaData').append(sessionElement);

	for (let i = 0; i < questionsArray.length; i++){
		questionListElement.push('<li class="tableTopic">'+ questionsArray[i] +'</li>');

	};

	console.log('questionListElement:');
	console.log(questionListElement);

let questionCard =

  '<section class="section tableTopicSession displayTopics">' +
    '<div class="container columns">' +

    	'<section id="sessionMetaData" class="column auto">' +
	      '<h3 class="title">Theme</h3>' +
	      	'<h5 class="topicTheme topicInfo">'+ session.theme +'</h5>' +
	      '<h3 class="title">Introduction</h3>' +
	      	'<h5 class="topicIntroduction topicInfo">'+ session.introduction +'</h5>' +
	      '<h3 class="title" >Keywords</h3>  	' +
	      	'<h5 class="topicKeywords topicInfo">'+ session.keywords +'</h5>	' +
    	'</section>' +
    	'<section id="sessionQuestions" class="column auto">' +
	      '<h3 class="title">Questions</h3>' +
	      	'<ul class="topicsQuestionsList">' +
	      		questionListElement +
	      	'</ul>' +
    	'</section>' +
    '</div>' +
  
  '</section> <!-- displayTopics -->';




	$('#displayTopics').append(questionCard);






	// $('#sessionMetaData').append(	questionsArray);

};

function displayNavTabs(){
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
	checkForToken(displayNavTabs);
});

// Get a random question from the Db
$('#getOneQuestion').on('click', function(){
	$('#sessionMetaData').empty();
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







