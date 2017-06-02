getCurrentProfile(){
	$.get('/profile/me', function(data){
		//populate form
		$('#userName').text(data.userName);
	});
	
}

//on form submit
//Call the update endpoint