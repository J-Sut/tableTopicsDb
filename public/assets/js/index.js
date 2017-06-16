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

	let questionListElement = [];

	let $sectionCard = $('<section />', {class: 'section tableTopicSession'});
	let $container = $('<div />', {class: 'container ttContainer columns'});

	let $sessionMetaData = $('<section />', {class: 'sessionMetaData column is-one-third '});
	let $themeLabel = $('<h3 />', {class: 'themeLabel title', text: "Theme"});
	let $themeData = $('<h5 />', {class: 'themeData topicInfo', text: session.theme});
	let $introductionlabel = $('<h3 />', {class: 'introductionlabel title', text: "Introduction"});
	let $introductionData = $('<h5 />', {class: 'introductionData topicInfo', text: session.introduction});
	let $keywordsLabel = $('<h3 />', {class: 'keywordsLabel title', text: "Keywords"});
	let $keywordsData = $('<h5 />', {class: 'keywordsData topicInfo', text: session.keywords.join(', ')});

	let $sessionQuestions = $('<section />', {class: 'sessionQuestions column is-two-thirds'});
	let $questionsLabel = $('<h3 />', {class: 'questionsLabel title', text: "Questions"});
	let $questionsData = $('<ul />', {class: 'questionsData topicsQuestionsList', text: questionListElement});

	$sectionCard.append($container);
	$container.append($sessionMetaData, $sessionQuestions);
	$sessionMetaData.append($themeLabel, $themeData, $introductionlabel, $introductionData, $keywordsLabel, $keywordsData);

	$sessionQuestions.append($questionsLabel, $questionsData);


	$.map(session.questions, (question, index) => {
		console.log('question',index, question);
		//questionsArray.push(question);
		//questionListElement.push('<li class="tableTopic">'+ question +'</li>');
		let $li = $('<li />', {class: 'tableTopic', text: question});
		$questionsData.append($li);
		//questionListElement.push('<li class="tableTopic">'+ question +'</li>');
	});

	$('#displayTopics').append($sectionCard);
};

function displayNavTabs(){
	console.log('display Content Fired')
	$('#logOut, #profileTab, #logIn, #signUp').toggleClass('is-hidden');
};

function renderQueries(searchResults){
	let $submitLink = $('<a >', {href: './topics.html', class: 'newTopicLead', text: "Contribute a New Topic Here"});


	let $apology = $('<h3 />', {class: 'title is-3', text: "Sorry, no topic matched your search."});
	let $invitation = $('<h3 />', {class: 'title is-3', text: `But if you have an idea for a topic, please help out adding it. Thank you`});

	if(searchResults.length === 0) {
	$('#displayTopics')
		.empty()
		.append($apology, $invitation, $submitLink)

	}	

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

