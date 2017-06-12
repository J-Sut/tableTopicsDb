// ************ f(MODIFY-state) **************

let logInToken

// ************ f(MODIFY-state) **************

function checkForToken(callback){
	console.log('check for token fired')
 
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/users/token',
		success: function(data){
			console.log("Great token you've got there")
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

	var ttdbURL = "http://localhost:8080/topics";
	var query = {
		theme: sessionDetails.theme,
		sessionIntro: sessionDetails.sessionIntro,
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
			console.log(data);
		},
		contentType: 'application/json',
    dataType: 'json'
	});
};

function noTokenRedirect(){
	localStorage.setItem('message', 'Please log in first to submit Questions. Thank you!');
	location.href = `login.html?message`;
	// console.log(`login.html?message`);
	// console.log(localStorage.getItem('message'));


	// if not => redirect to sign in
				//And tell them you have to sign in first
				
				//location.href = http://localhost/login?message=You need to sign in first
				
				//localStorage.setItem('message', "You need to sign in first");
				//Redirect
				//localStorage.getItem('message');
				//localStorage.clear();
};

function logOutUser(userTokenId){
	let userId = userTokenId;

	$.ajax({
		type: 'DELETE',
		url: `http://localhost:8080/users/logout/${userId}`,
		success: function(){
			location.href = 'index.html';
		},
		error: function(){}
	});
};

function countSubmissions(){

		$.ajax({
		type: "GET",
		url: 'http://localhost:8080/topics',
		success: function(data){
			console.log(data.length);
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
					'<label class="label" >Question: </label>' +
				  '<p class="control">' +
				    '<textarea  class="topicQuestionInput textarea" placeholder="Normal textarea" required></textarea>' +
				  '</p>' + '<a class="delete"></a>'+

				'</div>');


	$('#sessionQuestions').append(newQuestInput);
};

function displayContent(){
		console.log('display Content Fired')
};

function displaySubmissionscount(count){
	$('#currentTopicsCount').text(count);
};


// ************ Event Calls & Listeners **************

//testing();

$(function(){
	// //if token exists => go to submissions
	// //	do an api Call to the Token endpoing
	// checkToken();
	checkForToken(displayContent);
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

	console.log("form submitted");
	console.log(sessionDetails);

	addNewSession(sessionDetails);

});

$('#addQuestion').on('click', addQuestion);

// logout the user
$('#logOut').on('click', function(){
	checkForToken(logOutUser);
})



