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
		contentType: 'application/json',
    dataType: 'json'
	});
};


// ************ Event Listeners **************

$('#signInForm').css("background-color", "red");

$('#signInForm').submit(function(e){
    e.preventDefault();
    console.log("submit fired");

    let userEmail = $('#userEmailInput').val();
    let userPw = $('#userPwInput').val()

    login(userEmail, userPw);

  });








