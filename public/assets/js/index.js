// ***************** State *******************

// ************ f(MODIFY-state) **************
function getOneQuestion(){
	console.log('1 Q clicked');


	return $.ajax({
		type: "GET",
		url: 'http://localhost:8080/topics/question',
		success: function(data){
			console.log("Question Found: ");
			console.log(data);
			ajaxQuestion = data;
		console.log(data);

		},
		error: function(data){
			console.log("get request error")
		}
	});		
	console.log("3" + ajaxQuestion);

};

function getWholeSession() {
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
}
// ************ f(RENDER-state) **************

// ************ Event Listeners **************

$('#getOneQuestion').on('click', function(){
	let topic = getOneQuestion();
	console.log("we got it => " );
	console.log(topic)
});

$('#getOneSession').on('click', function(){
	getWholeSession();
});