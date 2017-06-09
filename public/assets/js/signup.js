// ************ Declare Functions **************
function checkForToken(callback){
	console.log('check for token fired')
 
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/users/token',
		success: function(data){
			callback(data)
			console.log(data);
		},
		error: function(data){
			console.log('Token not found')
			
		}
	});	
}

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
			//location.href = 'login.html';
			console.log(data);
			createUserProfile(data);
		},
		contentType: 'application/json',
    dataType: 'json'
	});
};

function createUserProfile(userData){
	console.log(userData);
	let userId = userData._id;

	var ttdbURL = "http://localhost:8080/users/" +userId+ "/profile";
	var query = {
		user_id: userId,
		displayName: "Example_name3",
		bio: "A speaker on the rise3",
		photo: "photo3.com"
	}; 

	console.log("createUserProfile Fired");

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(profileData){
			//location.href = 'login.html';
			console.log(profileData);
		},
		contentType: 'application/json',
    dataType: 'json'
	});
};

function testing(){
	$('#newUserForm').css("background-color", '#343540');
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
		inClub: $('input[name="clubCheck"]:checked').val(),
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








