function addNewUser(term, callback) {

	let newUser = {
		name: $('#userNameInput').val(),
		email: $('#userEmailInput').val(),
		password: $('#passwordInput').val(),
		pwConf: $('#passwordConfInput').val(),
		//inClub: $('#clubCheck').val()

	}

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
			console.log(data);
		},
		contentType: 'application/json',
    dataType: 'json'
	});

	console.log(2);

};


function testing(){
	$('#newUserForm').css("background-color", 'lightgreen');
};

testing();

$('#ajaxTester').on('click', addNewUser)