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
			alert("incorrect email or password");
		},
		contentType: 'application/json',
    dataType: 'json'
	});
};

function logInPlease(message){
	console.log(message);
	$('#tableTopicsPractice').append('<h3 class="title is-3">'+ message +'</p>');
};

// *********** f(modify-state) **************

function resetPassword(email){
	var email = email
	var ttdbURL = `${baseUrl}/users/password/${email}`;

	$.ajax({
		type: "GET",
		url: ttdbURL,
		success: function(data){
			alert('check your email for your new password');
		},
		error: function(){
			alert("incorrect email or password");
		},
		contentType: 'application/json',
    dataType: 'json'
	});
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

$('#showForgotPassword').on('click', function(){
	$('.forgotPasswordModal').addClass('is-active');
});

$('#updateProfile, #cancel, .modal-background').on('click', function(){
	$('.forgotPasswordModal').toggleClass('is-active');
});

$('#passwordUpdateSubmit').on('click', function(){
	let recoveryEmail = $('#recoveryEmail').val();

	resetPassword(recoveryEmail);
})



