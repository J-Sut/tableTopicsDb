// ************ State **************

const baseUrl = 'http://www.tabletopicsdb.com';

// ************ f(Modify State) **************
function checkForToken(callback){
 
	$.ajax({
		type: "GET",
		url: baseUrl + '/users/token',
		success: function(data){
			callback(data)
		},
		error: function(data){
			console.log('Token not found')
		}
	});	
}

function addNewUser(newUser, clubInfo, callback) {

	// New User & Club information
	var ttdbURL = baseUrl + "/users";
	var query = {
		userName: newUser.name,
		password: newUser.password,
		passwordConf: newUser.pwConf,	
		email: newUser.email,
		inClub: newUser.inClub,
		tmTitle: newUser.tmTitle,
		memberClubList: clubInfo.name,

		clubName: clubInfo.name,
		location: {
			city: clubInfo.location.city,
			country: clubInfo.location.country
		},
		website: clubInfo.website
	}; 

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(data){
			data.tmTitle = newUser.tmTitle;
			createUserProfile(data);
			location.href = 'login.html';
		},
		error: function(){
			console.log('user not created')
		},
		contentType: 'application/json',
    dataType: 'json'
	});
};

function createUserProfile(userData){
	let userId = userData._id;

	var ttdbURL = `${baseUrl}/users/${userId}/profile`;
	var query = {
		user_id: userId,
		displayName: userData.username,
		bio: "",
		photo: "",
		tmTitle: userData.tmTitle
	}; 

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(profileData){
		},
		contentType: 'application/json',
    dataType: 'json'
	});
};

// ************ f(Render State) **************


function displayContent(){
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

  let newUser = {
		name: $('#userNameInput').val(),
		email: $('#userEmailInput').val().toLowerCase(),
		password: $('#passwordInput').val(),
		pwConf: $('#passwordConfInput').val(),
		inClub: $('input[name="clubCheck"]:checked').val(),

		// pass TM title while creating user
		tmTitle: $('#tmTitle').val()
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
		const message = `Password is incorrect`
	  console.log(message);
	  alert(message);
	};
});

// Reveal Club questions if the member states they are in a Club
$('#yesClub').on('change', function() {
	$('#memberInfo').removeClass("is-hidden");
});

$('#noClub').on('change', function() {
	$('#memberInfo').addClass("is-hidden");
});

$('#navHam').on('click', function(){
	$('#navHamDropdown').toggleClass('is-active');
	$('#navHam').toggleClass('is-active');
})






