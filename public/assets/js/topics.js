
// ************ f(MODIFY-state) **************

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

// ************ f(RENDER-state) **************


function testing(){
	$('#sessionSubmitForm').css("background-color", '#5E2323');
};

function addQuestion(){
	const newQuestInput = $('<label>',{class: 'questionLabel', text: 'Question'});

	newQuestInput.append($("<textarea>",{name: 'question[]'}),'<br>');

	$('#sessionQuestions').append(newQuestInput);
};

// ************ Event Calls & Listeners **************

testing();

$('#sessionSubmitForm').submit(function(e){
  e.preventDefault();

  let sessionDetails = {
		theme: $('#themeInput').val().trim(),
		sessionIntro: $('#sessionIntro').val().trim(),
		keywords: grabKeywords(),	
		questions: grabQuestions()
	};

	addNewSession(sessionDetails);
	
	// if (!req.body.session) {
 //  	console.log("You must be signed in to submit a session");
	// } else {
	// 	const message = `You're logged in. Your session will submit`;
	//   console.log(message);
	// };
});

$('#addQuestion').on('click', addQuestion);









