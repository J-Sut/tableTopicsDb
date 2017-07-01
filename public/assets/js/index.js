// ***************** State *******************

const baseUrl = 'http://www.tabletopicsdb.com';
// const baseUrl = 'http://localhost:8080';

// ************ f(MODIFY-state) **************

function countSubmissions(){

		$.ajax({
		type: "GET",
		url: `${baseUrl}/topics`,
		success: function(data){
			displaySubmissionsCount(data.length)
		},
		error: function(data){
			console.log('Did not count submissions')
		}
	});	
};

function countUsers(){

		$.ajax({
		type: "GET",
		url: `${baseUrl}/users/`,
		success: function(data){
			displayUsersCount(data.length)
		},
		error: function(data){
			console.log('Did not count users')
		}
	});	
};

function countClubs(){

		$.ajax({
		type: "GET",
		url: `${baseUrl}/clubs/`,
		success: function(data){
			displayClubsCount(data.length)
		},
		error: function(data){
			console.log('Did not count clubs')
		}
	});	
};

function checkForToken(callback){
 
	$.ajax({
		type: "GET",
		url: `${baseUrl}/users/token`,
		success: function(data){
			callback(data)
		},
		error: function(data){
			console.log('User not signed in')
		}
	});	
}

function getOneQuestion(callback){
	$.ajax({
		type: "GET",
		url: `${baseUrl}/topics/question`,
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
		url: `${baseUrl}/topics/session`,
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
		url: `${baseUrl}/users/logout/${userId}`,
		success: function(){
			location.reload();
			checkForToken();

		},
		error: function(){}
	});
};

function 	submitQuery(query){

	$.ajax({
		type: 'GET',
		url: `${baseUrl}/topics/query`,
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

function displaySubmissionsCount(count){
	$('#dbSubmissions').text(count);
};

function displayUsersCount(count){
	$('#dbMembers').text(count);
};

function displayClubsCount(count){
	$('#dbClubs').text(count);
};

function displayQuestion(question){
	$('#displayTopics')
		.empty()
		.append('<h3 class="title is-3Z	randomQuestion">'+ question +'</h3>')
	};

function displaySession(session){

	let questionListElement = [];

	let $sectionCard = $('<section />', {class: 'section tableTopicSession'});
	let $container = $('<div />', {class: 'container ttContainer columns'});

	let $sessionMetaData = $('<section />', {class: 'sessionMetaData column is-9 '});
	let $themeLabel = $('<h3 />', {class: 'themeLabel title', text: "Theme"});
	let $themeData = $('<h5 />', {class: 'themeData topicInfo', text: session.theme});
	let $introductionlabel = $('<h3 />', {class: 'introductionlabel title', text: "Introduction"});
	let $introductionData = $('<h5 />', {class: 'introductionData topicInfo', text: session.introduction});
	let $keywordsLabel = $('<h3 />', {class: 'keywordsLabel title', text: "Keywords"});
	let $keywordsData = $('<h5 />', {class: 'keywordsData topicInfo', text: session.keywords.join(', ')});

	let $sessionQuestions = $('<section />', {class: 'sessionQuestions column is-9 is-hidden'});
	let $questionsLabel = $('<h3 />', {class: 'questionsLabel title', text: "Questions"});
	let $questionsData = $('<ul />', {class: 'questionsData topicsQuestionsList', text: questionListElement});

	let $hideQuestionButton = $('<input />', {type: 'checkbox', class: 'showQuestionButton'});
	let $hideQuestionButtonLabel = $('<label />', {text: 'Show Topic Questions: '});


			// <p class="showQuestionsTick is-hidden">		
			// 	<label>Show Questions: </label>
			// 		<input type="checkbox" class="testee">
			// </p>
	$hideQuestionButtonLabel.append($hideQuestionButton);

	$sectionCard.append($container);
	$container.append($sessionMetaData, $sessionQuestions);
	$sessionMetaData.append($themeLabel, $themeData, $introductionlabel, $introductionData, $keywordsLabel, $keywordsData, $hideQuestionButtonLabel);

	$sessionQuestions.append($questionsLabel, $questionsData);

	$.map(session.questions, (question, index) => {

		let $li = $('<li />', {class: 'tableTopic', text: question});
		$questionsData.append($li);
	});

	$('#displayTopics').append($sectionCard);
};

function displayNavTabs(){
	$('#logOut, #profileTab, #logIn, #signUp').toggleClass('is-hidden');
};

function renderQueries(searchResults){
	let $submitLink = $('<a >', {href: './topics.html', class: 'newTopicLead', text: "Contribute a New Topic Here"});

	let $apology = $('<h3 />', {class: 'title is-3', text: "Sorry, no topic matched your search."});
	let $invitation = $('<h3 />', {class: 'title is-3', text: `But if you have one in mind, please help by adding it. Thank you`});

	if(searchResults.length === 0) {
	$('#displayTopics')
		.empty()
		.append($apology, $invitation, $submitLink)

	}	

	for(let i = 0; i < searchResults.length; i++){
		displaySession(searchResults[i]);
	}
};

function showSurvey(){
	$('#surveySpot').fadeIn('slow');
};

// ************ Event Listeners **************

// Check if user is logged in 
$(function(){
	checkForToken(displayNavTabs);
	countSubmissions();
	countUsers();
	countClubs();
	setTimeout(showSurvey, 15000);
});

// Get a random question from the Db
$('#getOneQuestion').on('click', function(){
	$('#sessionMetaData').empty();
	getOneQuestion(displayQuestion);
	$('.showQuestionsTick').addClass('is-hidden');
});


// Get random session from the Db
$('#getOneSession').on('click', function(){
	$('#displayTopics').empty();
	getWholeSession(displaySession);
	$('.showQuestionsTick').removeClass('is-hidden');
});

// Search db for query

$('#topicSearch').on('submit', function(e){
	e.preventDefault();
	$('#displayTopics').empty();
	let query = $('#queryInput').val();

	submitQuery(query);
	$('.showQuestionsTick').removeClass('is-hidden');
});

// logout the user
$('#logOut').on('click', function(){
	checkForToken(logOutUser);
});

$('#displayTopics').on('click', '.showQuestionButton', function(){
	$(this).parent().parent().parent().find('section.sessionQuestions').toggleClass('is-hidden');
	$(this).parent().parent().parent().find('section.sessionMetaData').toggleClass('is-3');
	$(this).parent().parent().parent().find('section.sessionMetaData').toggleClass('is-9');

	$(this).text('Questions');
});

$('#navHam').on('click', function(){
	$('#navHamDropdown').toggleClass('is-active');
	$('#navHam').toggleClass('is-active');
})

$('.delete').on('click', function(){
	$(this).parent().remove();
})

