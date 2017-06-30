/***************** State *****************/

let userData
const baseUrl = 'https://afternoon-cliffs-40325.herokuapp.com';


/***************** f(Modify-state) *****************/

function checkForToken(callback){
 
	$.ajax({
		type: "GET",
		url: baseUrl + '/users/token',
		success: function(data){
			callback(data)
			;
		},
		error: function(data){
			console.log('User not signed in')
			
		}
	});	
};

// Count total number of submissions to the Db
function countSubmissions(){

		$.ajax({
		type: "GET",
		url: baseUrl + '/topics',
		success: function(data){
			console.log(data.length);
			displaySubmissionscount(data.length)
		},
		error: function(data){
			console.log('Did not count submissions')
		}
	});	
};

function logOutUser(userTokenId){
	
	console.log('log out user called ')
	let userId = userTokenId;

	$.ajax({
		type: 'DELETE',
		url: baseUrl + `/users/logout/${userId}`,
		success: function(){
			displayNav();
		},
		error: function(){}
	});
};

/***************** f(Render-State) *****************/

function displaySubmissionscount(count){
	$('#currentTopicsCount').text(count);
};

function displayNav(){
	console.log('display Content Fired')
	$('#logOut, #profileTab, #logIn, #signUp').toggleClass('is-hidden');
};
/***************** Event Listeners *****************/

$(function(){
	countSubmissions();
	checkForToken(displayNav);
});

$('#logOut').on('click', function(){
	checkForToken(logOutUser);
});

$('#navHam').on('click', function(){
	$('#navHamDropdown').toggleClass('is-active');
	$('#navHam').toggleClass('is-active');
})





