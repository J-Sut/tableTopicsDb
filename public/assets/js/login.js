// ************ State **************

const baseUrl = 'http://www.tabletopicsdb.com';
// const baseUrl = 'http://localhost:8080';

// ************ Declare Functions **************

function login(em, pw, callback) {

	var ttdbURL = `${baseUrl}/users/login`;
	var query = {
		email: em,
		password: pw
	}; 

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(data){
			location.href = 'profile.html';

		},
		error: function(){
			alert("incorrect password");
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

$('#navHam').on('click', function(){
	$('#navHamDropdown').toggleClass('is-active');
	$('#navHam').toggleClass('is-active');
})




