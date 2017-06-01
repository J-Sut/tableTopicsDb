
// ************ f(MODIFY-state) **************

function prepKeywords() {
  let trimmedKeywordsArray = []
	let keywordsArray = $('#keywordsInput').val().split(",");
	for (let i=0; i<keywordsArray.length; i++) {
		trimmedKeywordsArray.push(keywordsArray[i].trim());
	};
	return trimmedKeywordsArray;
};

function addNewSession(sessionDetails, callback) {

	console.log("sessionDetails");

	var ttdbURL = "http://localhost:8080/topics";
	var query = {
		theme: "from the browser",
		sessionIntro: "Then one day, they moved from postman to the browser",
		keywords: [
			"improvement", 
			"evolution", 
			"development"
		],	
		questions: [
			"Will it send from the browser?",
			"Will you celebrate when it does?"
		]
	}; 

	console.log("info before ajax call");

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

// ************ Event Calls & Listeners **************

testing();

$('#sessionSubmitForm').submit(function(e){
  e.preventDefault();
  	console.log("submit fired");

  let questionsArray = [
  	$('.question').val()
  ];

	console.log(questionsArray);
  //console.log(prepKeywords());


  // function prepQuestions(keywordsArray) {
	 //  let trimmedKeywordsArray = []
  // 	for (let i=0; i<keywordsArray.length; i++) {
  // 		trimmedKeywordsArray.push(keywordsArray[i].trim());
  // 	};
  // 	console.log(trimmedKeywordsArray);
  // };

  // trimKeywords(keywordsArray);

  //addNewSession("sessionDetails2");

 //  let newUser = {
	// 	name: $('#userNameInput').val(),
	// 	email: $('#userEmailInput').val(),
	// 	password: $('#passwordInput').val(),
	// 	pwConf: $('#passwordConfInput').val(),
	// 	inClub: $('input[name="clubCheck"]:checked').val(),
	// };

	// let clubInfo = {
	// 	name: $('#clubNameInput').val(),
	// 	location: {
	// 		city:$('#clubCityInput').val(),
	// 		country: $('#clubCountryInput').val()
	// 	},
	// 	website: $('#clubWebsiteInput').val()
	// };

	// if (newUser.password === newUser.pwConf) {
 //  	addNewUser(newUser, clubInfo);
	// } else {
	// 	const message = `Passwords do not match`
	//   console.log(message);
	//   alert(message);
	// };

});

// Reveal Club questions if the member states they are in a Club
$('#yesClub').on('change', function() {
	$('#memberInfo').removeClass("hide");
});

$('#noClub').on('change', function() {
	$('#memberInfo').addClass("hide");
});








