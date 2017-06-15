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
		.append('<h3 class="title is-3Z	randomQuestion">'+ question +'</h3>')
	};

function displaySession(session){
	//let questionsArray = [];
	let questionListElement = [];
	console.log('session.questions',session.questions);


//got the questions in an array... 
	//console.log(questionListElement)

	// $('#sessionMetaData').append(sessionElement);

	//for (let i = 0; i < questionsArray.length; i++){
	//	questionListElement.push('<li class="tableTopic">'+ questionsArray[i] +'</li>');
	//
	//};

	console.log('questionListElement:', questionListElement);
	let $sectionCard = $('<section />', {class: 'section tableTopicSession'});
	let $container = $('<div />', {class: 'container columns'});

	let $sessionMetaData = $('<section />', {class: 'sessionMetaData column '});
	let $themeLabel = $('<h3 />', {class: 'themeLabel title', text: "Theme"});
	let $themeData = $('<h5 />', {class: 'themeData topicInfo', text: session.theme});
	let $introductionlabel = $('<h3 />', {class: 'introductionlabel title', text: "Introduction"});
	let $introductionData = $('<h5 />', {class: 'introductionData topicInfo', text: session.introduction});
	let $keywordsLabel = $('<h3 />', {class: 'keywordsLabel title', text: "Keywords"});
	let $keywordsData = $('<h5 />', {class: 'keywordsData topicInfo', text: session.keywords});

	let $sessionQuestions = $('<section />', {class: 'sessionQuestions column '});
	let $questionsLabel = $('<h3 />', {class: 'questionsLabel title', text: "Questions"});
	let $questionsData = $('<ul />', {class: 'questionsData topicsQuestionsList', text: questionListElement});


	$sectionCard.append($container);
	$container.append($sessionMetaData);
	$sessionMetaData.append($themeLabel, $themeData, $introductionlabel, $introductionData, $keywordsLabel, $keywordsData);

	$sectionCard.append($sessionQuestions);
	$sessionQuestions.append($questionsLabel, $questionsData);


	$.map(session.questions, (question, index) => {
		console.log('question',index, question);
		//questionsArray.push(question);
		//questionListElement.push('<li class="tableTopic">'+ question +'</li>');
		let $li = $('<li />', {class: 'tableTopic', text: question});
		$questionsData.append($li);
		//questionListElement.push('<li class="tableTopic">'+ question +'</li>');
	});


// let questionCard =

//   '<section class="section tableTopicSession displayTopics;">' +
//     '<div class="container columns">' +

//     	'<section class="sessionMetaData column ">' +
// 	      '<h3 class="themeLabel title">Theme</h3>' +
// 	      	'<h5 class="themeData topicInfo">'+ session.theme +'</h5>' +
// 	      '<h3 class="introductionlabel title">Introduction</h3>' +
// 	      	'<h5 class="introductionData topicInfo">'+ session.introduction +'</h5>' +
	      


// 	      '<h3 class="keywordsLabel title" >Keywords</h3>  	' +
// 	      	'<h5 class="keywordsData topicInfo">'+ session.keywords +'</h5>	' +
//     	'</section>' +



//     	'<section id="sessionQuestions" class="sessionQuestions column ">' +
// 	      '<h3 class="questionsLabel title">Questions</h3>' +
// 	      	'<ul class="questionsData topicsQuestionsList">' +
// 	      		questionListElement +
// 	      	'</ul>' +
//     	'</section>' +
//     '</div>' +
  
//   '</section> <!-- displayTopics -->';

  // let $questionCard = $(questionCard);
  // $questionCard.find('.topicTheme').text(session.theme);


	$('#displayTopics').append($sectionCard);






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







