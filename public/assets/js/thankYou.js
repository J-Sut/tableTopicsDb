/***************** State *****************/



/***************** f(Modify-state) *****************/

function checkForToken(callback){
 
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/users/token',
		success: function(data){
			callback(data)
			console.log(data);
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
		url: 'http://localhost:8080/topics',
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
		url: `http://localhost:8080/users/logout/${userId}`,
		success: function(){
			checkForToken();
			location.reload();
		},
		error: function(){}
	});
};

/***************** f(Render-State) *****************/

function displaySubmissionscount(count){
	$('#currentTopicsCount').text(count);
};


/***************** Event Listeners *****************/

$(function(){
	countSubmissions();
});

$('#logOut').on('click', function(){
	checkForToken(logOutUser);
});








