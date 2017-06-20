// ************ State **************


// ************ Declare Functions **************

function login(em, pw, callback) {

	var ttdbURL = "http://localhost:8080/users/login";
	var query = {
		email: em,
		password: pw
	}; 

	console.log('login token: ');

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(data){
			location.href = 'profile.html';
			console.log(data);

		},
		error: function(){

		},
		contentType: 'application/json',
    dataType: 'json'
	});
};

function logInPlease(message){
	console.log(message);
	$('#tableTopicsPractice').append('<h3 class="title is-3">'+ message +'</p>');
};


// ************ Event Listeners **************

$('#signInForm').submit(function(e){
    e.preventDefault();
    console.log("submit fired");

    let userEmail = $('#userEmailInput').val().toLowerCase();
    let userPw = $('#userPwInput').val()

    login(userEmail, userPw);

  });

$(function(){
	if (localStorage.getItem('message')){
		logInPlease(localStorage.getItem('message'));
		localStorage.clear();
	}
});






