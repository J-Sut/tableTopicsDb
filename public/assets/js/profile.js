// **************** State ******************
var userData;


			// $('body').css('background-color', 'green');

// ************ f(Modify-state) **************

function getTopics(callback){
	let userId = userData.user_id;

	$.ajax({
		type: 'GET',
		url: `http://localhost:8080/users/${userId}/topics`,
		success: function(data){
			if(data.length === 0) {
				encourageSubmit();
			};
			callback(data)
		},
		error: function(data){
			console.log('Token not found')
		},
	});	
};

function checkForToken(callback){
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/users/token',
		success: function(data){
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
		displayProfileData(data);
		getTopics(displaySession);
		getClubInfo(data)
	});
};

function getClubInfo(userData){
	let userId = userData.user_id

	$.ajax({
		type: 'GET',
		url: `http://localhost:8080/clubs/${userId}/profile`,
		success: function(clubs){
			renderClubInfo(clubs)
		},
		error: function(data){
			console.log('Token not found')
		},
	});	
};

function updateProfile(updateInfo){

		console.log('update Profile fired: ', updateInfo);
 
		let query = {
			id: userData._id,
			displayName: updateInfo.name,
			bio: updateInfo.bio,
			tmTitle: updateInfo.tmTitle
			}

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

// ************ f(Render-state) **************

function encourageSubmit(){
	let $submitLink = $('<a >', {href: './topics.html', class: 'newTopicLead', text: "Contribute a New Topic Here"});

	// let $invitationRow = $('<div />', {class: 'invitationRow'});

	let $apology = $('<h4 />', {class: 'title is-4', text: "It looks like you haven't submitted any topics yet"});
	let $invitation = $('<h4 />', {class: 'title is-4', text: `Our community would love to explore your contributions`});

	$('#displayMyTopics')
		.empty()
		.append($apology, $invitation, $submitLink)

};


function displayContent(){
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

$(function(){
	checkForToken(displayContent);
});

function displayProfileData(data){
	$('#userName').text(data.displayName);
	$('#userBio').text(data.bio);		
	$('#tmTitle').text(data.tmTitle);		
};

function displaySession(session){

	$('#myTopicsTitle').removeClass('is-hidden');

	for (let i = 0; i < session.length; i++) {
		let questionListElement = [];

		let $sectionCard = $('<section />', {class: 'section tableTopicSession'});
		let $container = $('<div />', {class: 'container ttContainer columns'});

		let $sessionMetaData = $('<section />', {class: 'sessionMetaData column '});
		let $themeLabel = $('<h3 />', {class: 'themeLabel title', text: "Theme"});
		let $themeData = $('<h5 />', {class: 'themeData topicInfo', text: session[i].theme});
		let $introductionlabel = $('<h3 />', {class: 'introductionlabel title', text: "Introduction"});
		let $introductionData = $('<h5 />', {class: 'introductionData topicInfo', text: session[i].introduction});
		let $keywordsLabel = $('<h3 />', {class: 'keywordsLabel title', text: "Keywords"});
		let $keywordsData = $('<h5 />', {class: 'keywordsData topicInfo', text: session[i].keywords.join(', ')});

		let $sessionQuestions = $('<section />', {class: 'sessionQuestions column is-two-thirds'});
		let $questionsLabel = $('<h3 />', {class: 'questionsLabel title', text: "Questions"});
		let $questionsData = $('<ul />', {class: 'questionsData topicsQuestionsList', text: questionListElement});

		$sectionCard.append($container);
		$container.append($sessionMetaData, $sessionQuestions);
		$sessionMetaData.append($themeLabel, $themeData, $introductionlabel, $introductionData, $keywordsLabel, $keywordsData);

		$sessionQuestions.append($questionsLabel, $questionsData);

		$.map(session[i].questions, (question, index) => {
			let $li = $('<li />', {class: 'tableTopic', text: question});
			$questionsData.append($li);
		});

		$('#displayMyTopics').append($sectionCard);
	}
};

function renderClubInfo(clubs){
	$('#clubName').text(clubs[0].name);
	$('#clubLocation').text(clubs[0].location.city + ', ' + clubs[0].location.country );
	$('#clubWebsite').text(clubs[0].website);

};


// ************ Event Listeners **************

// Get and Display profile info of logged in User
$(function(e){
  getProfileData();
});

// Reveal inputs so that users can update their profile
$('#updateProfile, #cancel, .delete, .modal-background').on('click', function(){
	$('.modal').toggleClass('is-active');
});

$('#submitButton').on('click', function(){
	let userProfile = {}

	if (!($('#userNameUpdate').val() === '' || undefined)) {
		userProfile.name = $('#userNameUpdate').val();
	}

	if (!($('#userBioUpdate').val() === '' || undefined)) {
		userProfile.bio = $('#userBioUpdate').val();
	}

	if (!($('#tmTitleDropdown').val() === '-1')) {
		userProfile.tmTitle = $('#tmTitleDropdown').val();
	}

	updateProfile(userProfile);
	$('.modal').toggleClass('is-active');
});

// logout the user
$('#logOut').on('click', function(){
	checkForToken(logOutUser);
})
