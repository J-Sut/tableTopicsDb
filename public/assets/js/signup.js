// ************ Declare Functions **************


function addNewUser(newUser, callback) {

	

	console.log(newUser);

	var ttdbURL = "http://localhost:8080/users";
	var query = {
		userName: newUser.name,
		password: newUser.password,
		passwordConf: newUser.pwConf,	
		email: newUser.email,
		inClub: true
	}; 

	console.log(1);

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(data){
			location.href = 'profile.html';
			console.log("data");
		},
		contentType: 'application/json',
    dataType: 'json'
	});
};


function testing(){
	$('#newUserForm').css("background-color", 'lightgreen');
};

// ************ Event Listeners **************

testing();

$('#newUserForm').submit(function(e){
  e.preventDefault();
  console.log("form submitted");

  let newUser = {
		name: $('#userNameInput').val(),
		email: $('#userEmailInput').val(),
		password: $('#passwordInput').val(),
		pwConf: $('#passwordConfInput').val(),
		//inClub: $('#clubCheck').val()
	}

  addNewUser(newUser);

});

