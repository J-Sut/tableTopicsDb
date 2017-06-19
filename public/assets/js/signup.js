// ************ f(Modify State) **************
function checkForToken(callback){
	console.log('check for token fired')
 
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/users/token',
		success: function(data){
			console.log("Great token you've got there")
			callback(data)
		},
		error: function(data){
			console.log('Token not found')
		}
	});	
}

function addNewUser(newUser, clubInfo, callback) {

	// New User & Club information
	var ttdbURL = "http://localhost:8080/users";
	var query = {
		userName: newUser.name,
		password: newUser.password,
		passwordConf: newUser.pwConf,	
		email: newUser.email,
		inClub: newUser.inClub,
		tm_title: newUser.tmTitle,
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
			createUserProfile(data);
			location.href = 'login.html';

		},
		contentType: 'application/json',
    dataType: 'json'
	});
};

function createUserProfile(userData){
	console.log("userData for Creating profile: ", userData);
	let userId = userData._id;

	var ttdbURL = "http://localhost:8080/users/" +userId+ "/profile";
	var query = {
		user_id: userId,
		displayName: userData.username,
		bio: "",
		photo: "",
		tm_title: userData.tm_title
	}; 

	console.log("createUserProfile Fired");

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(profileData){
			console.log(profileData);
		},
		contentType: 'application/json',
    dataType: 'json'
	});
};

// ************ f(Render State) **************


function displayContent(){
	console.log('display Content Fired')
	$('#logOut, #profileTab, #logIn, #signUp').toggleClass('is-hidden');
};

// ************ Event Listeners **************

// Display the appropriate Navbar based on Signed in or not
$(function(){
	checkForToken(displayContent);
});


// Submit new User Button Action
$('#newUserForm').submit(function(e){
  e.preventDefault();
  console.log("form submitted");

  let newUser = {
		name: $('#userNameInput').val(),
		email: $('#userEmailInput').val().toLowerCase(),
		password: $('#passwordInput').val(),
		pwConf: $('#passwordConfInput').val(),
		inClub: $('input[name="clubCheck"]:checked').val(),
		

		tmTitle: $('#tmTitle option:selected').val()
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

		console.log('tmTitle: ', tmTitle);


});

// Reveal Club questions if the member states they are in a Club
$('#yesClub').on('change', function() {
	$('#memberInfo').removeClass("is-hidden");
});

$('#noClub').on('change', function() {
	$('#memberInfo').addClass("is-hidden");
});








