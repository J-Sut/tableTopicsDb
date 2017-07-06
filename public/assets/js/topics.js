// ************ f(MODIFY-state) **************

let logInToken;

const baseUrl = 'http://www.tabletopicsdb.com';
// const baseUrl = 'http://localhost:8080';

// ************ f(MODIFY-state) **************

function checkForToken(callback){ 
	$.ajax({
		type: "GET",
		url: baseUrl + '/users/token',
		success: function(data){
			logInToken = data;
			callback(data)
		},
		error: function(data){
			console.log('Token not found')
			noTokenRedirect()
		}
	});	
}

function grabKeywords() {
  let trimmedKeywordsArray = []
	let keywordsArray = $('#keywordsInput').val().split(",");
	for (let i=0; i<keywordsArray.length; i++) {
		trimmedKeywordsArray.push(keywordsArray[i].trim());
	};
	return trimmedKeywordsArray;
};

function grabQuestions() {
	let questionsArray = [];

	$("#sessionQuestions textarea").each(function( index ) {
		questionsArray.push($(this).val().trim());
	});

	return questionsArray;
};

function addNewSession(sessionDetails, callback) {

	var ttdbURL = baseUrl + "/topics";
	var query = {
		theme: sessionDetails.theme,
		introduction: sessionDetails.sessionIntro,
		keywords: sessionDetails.keywords,	
		questions: sessionDetails.questions,
		user_id: logInToken
	}; 

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(data){
			location.href = 'thankyou.html';
		},
		error: function(){
			console.log("Ajax Post Error")
		},

		contentType: 'application/json',
    dataType: 'json'
	});
};

function noTokenRedirect(){
	localStorage.setItem('message', 'Please log in first to submit Topics. Thank you!');
	location.href = `login.html?message`;
};

function logOutUser(userTokenId){
	let userId = userTokenId;

	$.ajax({
		type: 'DELETE',
		url: baseUrl + `/users/logout/${userId}`,
		success: function(){
			location.href = 'index.html';
		},
		error: function(){}
	});
};

function countSubmissions(){
		$.ajax({
		type: "GET",
		url: baseUrl + '/topics',
		success: function(data){
			displaySubmissionscount(data.length)
		},
		error: function(data){
			console.log('Did not count submissions')
		}
	});	
};


// ************ f(RENDER-state) **************

function addQuestion(){
	const newQuestInput = $(
				'<div class="topicQuestion field is-grouped">' +
					'<label class="label" >Question </label>' +
				  '<p class="control">' +
				    '<textarea  class="topicQuestionInput textarea" placeholder="Textarea" required></textarea>' +
				  '</p>' + '<a class="delete"></a>'+

				'<br>' +
				'</div>' );

	$('#sessionQuestions').append(newQuestInput);
};

function displaySubmissionscount(count){
	$('#currentTopicsCount').text(count);
};

function displayNavTabs(){
	$('#logOut, #profileTab, #logIn, #signUp').toggleClass('is-hidden');
};

// ************ Event Calls & Listeners **************

$(function(){
	checkForToken(displayNavTabs);
	countSubmissions();
});

$('#sessionSubmitForm').submit(function(e){
  e.preventDefault();

  let sessionDetails = {
		theme: $('#themeInput').val().trim(),
		sessionIntro: $('#sessionIntro').val().trim(),
		keywords: grabKeywords(),	
		questions: grabQuestions()
	};

	addNewSession(sessionDetails);
});

$('#addQuestion').on('click', addQuestion);

// logout the user
$('#logOut').on('click', function(){
	checkForToken(logOutUser);
})

$('#sessionQuestions').on('click', '.delete', function(){
	$(this).parent().remove();
});

$('#navHam').on('click', function(){
	$('#navHamDropdown').toggleClass('is-active');
	$('#navHam').toggleClass('is-active');
})


