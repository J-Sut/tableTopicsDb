// ***************** State *******************

// ************ f(MODIFY-state) **************

// ************ f(RENDER-state) **************

// ************ Event Listeners **************

$('#getOneQuestion').on('click', function(){
	console.log('1 Q clicked');
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/topics/question',
		success: function(data){
			console.log("Question Found: ");
			console.log(data);

		},
		error: function(data){
			console.log("get request error")
		}
	});		
});

$('#getOneSession').on('click', function(){
	console.log('1 Sess clicked');
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/topics/session',
		success: function(data){
			console.log("Session Found: ");
			console.log(data);

		},
		error: function(data){
			console.log("Get Session not working")
		}
	});		
});