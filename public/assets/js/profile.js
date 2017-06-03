// **************** State ******************


			// $('body').css('background-color', 'green');

// ************ f(Modify-state) **************


function getProfileData(){
	$.get('users/profile/me', function(data){
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
	 id: "59288af4af018937b04a0625",
	 displayName: "Dapper-Dan",
	 bio: "A George Clooney lookalike"		}; 

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

};

//on form submit
//Call the update endpoint'


// ************ f(Render-state) **************

function displayProfileData(data){
			//populate form
	console.log(data)
	if(data === null){
		$('#updateProfile').text('Create Profile')
			.css('background-color', 'green');
	} else {
		console.log(data.displayName);
		console.log(data.bio);

		$('#userName').text(data.displayName).css('background-color', '#235434');
		$('#userBio').text(data.bio);			

		$('#updateProfile').css('background-color', 'yellow');
	};
};

// ************ Event Listeners **************

window.onload = (function(e){
  getProfileData();
});

$('#updateProfile').on('click', function(){
	$('#userNameInput, #userBioInput, #submitUpdate').removeClass('hide');
	$('#updateProfile, #userName, #userBio').addClass('hide');
});

$('#submitUpdate').on('click', function() {
	$('#submitUpdate, #userNameInput, #userBioInput').addClass('hide');
	$('#updateProfile, #userName, #userBio').removeClass('hide');

	updateProfile();
	getProfileData();


});
