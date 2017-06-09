// **************** State ******************
var userData;


			// $('body').css('background-color', 'green');

// ************ f(Modify-state) **************

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

function getProfileData(){
	$.getJSON('users/profile/me', function(data){
		userData = data;
		displayProfileData(data);
	});
};

function getClubInfo(){

};

function updateProfile(){
	console.log('Update Profile fired')
	// let profileId = //...
	// let updatePath = "users" + profileId + "profile"
	// $.put("users/59288af4af018937b04a0625/profile", function(){});
		let query = {
			id: userData._id,
			displayName: $('#userNameInput').val(),
			bio: $('#userBioInput').val()}; 

		$.ajax({
			type: "PUT",
			url: 'http://localhost:8080/users/'+userData._id+ '/profile',
			data: JSON.stringify(query),
			success: function(data){
				//location.href = 'login.html';
				console.log(data);
				displayProfileData(data);
			},
			contentType: 'application/json',
			dataType: 'json'
		});
};

//on form submit
//Call the update endpoint'


function getProfileJsonObject(data){

};

function displayContent(){
	console.log('display Content Fired')
	$('#logOut, #profileTab, #logIn, #signUp').toggleClass('is-hidden');
};

// ************ f(Render-state) **************

$(function(){
	checkForToken(displayContent);
});

function displayProfileData(data){
			//populate form
	console.log(data)
	if(data === null){
		$('#updateProfile').text('Create Profile')
			.css('background-color', 'green');
	} else {
		console.log(data.displayName);
		console.log(data.bio)
		console.log(data.user_id);

		$('#userName').text(data.displayName).css('background-color', '#235434');
		$('#userBio').text(data.bio);			

		$('#updateProfile').css('background-color', 'yellow');
	};
};

// ************ Event Listeners **************

// Get and Display profile info of logged in User
$(function(e){
  getProfileData();
});

// Reveal inputs so that users can update their profile
$('#updateProfile').on('click', function(){
	$('#userNameInput, #userBioInput, #submitUpdate').removeClass('hide');
	$('#updateProfile, #userName, #userBio').addClass('hide');
});

// Submit new profile information to update
$('#submitUpdate').on('click', function() {
	$('#submitUpdate, #userNameInput, #userBioInput').addClass('hide');
	$('#updateProfile, #userName, #userBio').removeClass('hide');

	updateProfile();
});
