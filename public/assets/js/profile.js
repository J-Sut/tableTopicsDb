// **************** State ******************
var userData;


			// $('body').css('background-color', 'green');

// ************ f(Modify-state) **************

function getTopics(callback){
	let userId = userData.user_id;

	console.log(userId)

	$.ajax({
		type: 'GET',
		url: `http://localhost:8080/users/${userId}/topics`,
		success: function(data){
			console.log("Great token you've got there")
			callback(data)
		},
		error: function(data){
			console.log('Token not found')
		},
	});	
};


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
			location.href = 'login.html';
		}
	});	
}

function getProfileData(){
	$.getJSON('users/profile/me', function(data){
		userData = data;
		console.log(data)
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

function logOutUser(userTokenId){
	let userId = userTokenId;

	$.ajax({
		type: 'DELETE',
		url: `http://localhost:8080/users/logout/${userId}`,
		success: function(){
			checkForToken();
			location.reload();

		},
		error: function(){}
	});
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


function displaySession(userSessions){

	let session = userSessions

	console.log('session2: ', session[0].theme, session[0].questions, session[0].keywords);




	// let questionListElement = [];

	// let $sectionCard = $('<section />', {class: 'section tableTopicSession'});
	// let $container = $('<div />', {class: 'container ttContainer columns'});

	// let $sessionMetaData = $('<section />', {class: 'sessionMetaData column '});
	// let $themeLabel = $('<h3 />', {class: 'themeLabel title', text: "Theme"});
	// let $themeData = $('<h5 />', {class: 'themeData topicInfo', text: session.theme});
	// let $introductionlabel = $('<h3 />', {class: 'introductionlabel title', text: "Introduction"});
	// let $introductionData = $('<h5 />', {class: 'introductionData topicInfo', text: session.introduction});
	// let $keywordsLabel = $('<h3 />', {class: 'keywordsLabel title', text: "Keywords"});
	// let $keywordsData = $('<h5 />', {class: 'keywordsData topicInfo', text: session.keywords.join(', ')});

	// let $sessionQuestions = $('<section />', {class: 'sessionQuestions column is-two-thirds is-hidden'});
	// let $questionsLabel = $('<h3 />', {class: 'questionsLabel title', text: "Questions"});
	// let $questionsData = $('<ul />', {class: 'questionsData topicsQuestionsList', text: questionListElement});

	// $sectionCard.append($container);
	// $container.append($sessionMetaData, $sessionQuestions);
	// $sessionMetaData.append($themeLabel, $themeData, $introductionlabel, $introductionData, $keywordsLabel, $keywordsData);

	// $sessionQuestions.append($questionsLabel, $questionsData);


	// $.map(session.questions, (question, index) => {
	// 	console.log('question',index, question);
	// 	//questionsArray.push(question);
	// 	//questionListElement.push('<li class="tableTopic">'+ question +'</li>');
	// 	let $li = $('<li />', {class: 'tableTopic', text: question});
	// 	$questionsData.append($li);
	// 	//questionListElement.push('<li class="tableTopic">'+ question +'</li>');
	// });

	// $('#displayMyTopics').append($sectionCard);
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

// logout the user
$('#logOut').on('click', function(){
	checkForToken(logOutUser);
})

// Get Users submited topics
$('#myTopics').on('click', function(){
	console.log('getting topics')
	getTopics(displaySession);
});
