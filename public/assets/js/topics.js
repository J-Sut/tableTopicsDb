// ************ f(MODIFY-state) **************

// ************ f(MODIFY-state) **************

function checkForToken(callback){
	console.log('check for token fired')
 
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/users/token',
		success: function(data){
			console.log("Great token you've got there")
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
		questions: sessionDetails.questions
	}; 

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(data){
			//location.href = 'index.html';
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

// ************ f(RENDER-state) **************

function addQuestion(){
	const newQuestInput = $('<label>',{class: 'questionLabel', text: 'Question'});

	newQuestInput.append($("<textarea>",{name: 'question[]'}),'<br>');

	$('#sessionQuestions').append(newQuestInput);
};

function displayContent(){
		console.log('display Content Fired')
};

// ************ Event Calls & Listeners **************

//testing();

$(function(){
	// //if token exists => go to submissions
	// //	do an api Call to the Token endpoing
	// checkToken();
	checkForToken(displayContent);
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
	location.href = `index.html`;

});

$('#addQuestion').on('click', addQuestion);









