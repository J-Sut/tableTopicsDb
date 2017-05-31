// ************ Declare Functions **************


function addNewUser(newUser, clubInfo, callback) {

	

	console.log(newUser);

	var ttdbURL = "http://localhost:8080/users";
	var query = {
		userName: newUser.name,
		password: newUser.password,
		passwordConf: newUser.pwConf,	
		email: newUser.email,
		inClub: newUser.inClub,
		memberClubList: clubInfo.name,

		clubName: clubInfo.name,
		location: {
			city: clubInfo.location.city,
			country: clubInfo.location.country
		},
		website: clubInfo.website
	}; 

	console.log(clubInfo);

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
		inClub: true,
	};

	let clubInfo = {
		name: $('#clubNameInput').val(),
		location: {
			city:$('#clubCityInput').val(),
			country: $('#clubCountryInput').val()
		},
		website: $('#clubWebsiteInput').val()
	};

	if (newUser.password === newUser.pwConf) {
  	addNewUser(newUser, clubInfo);
	} else {
		const message = `Passwords do not match`
	  console.log(message);
	  alert(message);
	};

});

// Reveal Club questions if the member states they are in a Club
$('#yesClub').on('change', function() {
	$('#memberInfo').removeClass("hide");
});

$('#noClub').on('change', function() {
	$('#memberInfo').addClass("hide");
});








