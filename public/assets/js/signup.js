function addNewUser(term, callback) {
	var ttdbURL = "http://localhost:8080/users";
	var query = {
		userName: "frontside test",
		password: "ft",
		passwordConf: "ft",	
		email: "ft@frontside.com",
		inClub: true
	}; 

	console.log(1);

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(data){
			console.log(data, term);
		},
		contentType: 'application/json',
    dataType: 'json'
	});

	console.log(2);

};


function testing(){
	$('#newUserForm').css("background-color", 'green');
};

testing();

$('#ajaxTester').on('click', addNewUser)