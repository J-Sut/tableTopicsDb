// **************** State ******************


			// $('body').css('background-color', 'green');

// ************ f(Modify-state) **************


function getProfileData(){
	$.getJSON('users/profile/me', function(data){
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
	$.getJSON('users/profile/me', function(data){
		console.log("updateProfile ID: " + data._id);
		let query = {
			id: data._id,
			displayName: $('#userNameInput').val(),
			bio: $('#userBioInput').val()}; 

		$.ajax({
			type: "PUT",
			url: 'http://localhost:8080/users/59288af4af018937b04a0625/profile',
			data: JSON.stringify(query),
			success: function(data){
				//location.href = 'login.html';
				console.log(data);
			},
			contentType: 'application/json',
			dataType: 'json'
		});
		displayProfileData(data);
		console.log(data)
	});
};

//on form submit
//Call the update endpoint'


function getProfileJsonObject(data){

};


// ************ f(Render-state) **************

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
window.onload = (function(e){
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
	getProfileData();


});
