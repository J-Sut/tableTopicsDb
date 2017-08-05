// ************ State **************



// ************ f(MODIFY-state) **************


function grabKeywords() {
  let trimmedKeywordsArray = []
	let keywordsArray = $('#keywordsInput').val().split(",");
	for (let i=0; i<keywordsArray.length; i++) {
		trimmedKeywordsArray.push(keywordsArray[i].trim());
	};
	return trimmedKeywordsArray;
};

function grabQuestions() {
	let questionsArray = [];

	$("#sessionQuestions textarea").each(function( index ) {
		questionsArray.push($(this).val().trim());
	});

	return questionsArray;
};

function addNewSession(sessionDetails, callback) {

	var ttdbURL = baseUrl + "/topics";
	var query = {
		theme: sessionDetails.theme,
		introduction: sessionDetails.sessionIntro,
		keywords: sessionDetails.keywords,	
		questions: sessionDetails.questions,
		user_id: logInToken
	}; 

	$.ajax({
		type: "POST",
		url: ttdbURL,
		data: JSON.stringify(query),
		success: function(data){
			location.href = 'thankyou.html';
		},
		error: function(){
			console.log("Ajax Post Error")
		},

		contentType: 'application/json',
    dataType: 'json'
	});
};


// ************ f(RENDER-state) **************

function addQuestion(){
	const newQuestInput = $(
				'<div class="topicQuestion">' +
					'<a class="delete"></a>'+
				  '<p class="control">' +
				    '<textarea  class="topicQuestionInput textarea" placeholder="Awesome, the most popular sessions have 8 or more questions" required></textarea>' +
				  '</p>' + 
				'</div>' );

	$('#topicQuestions').append(newQuestInput);
};

let submitTopicForm = `
	<div id="topicsSubmitArea">
			<form id="sessionSubmitForm" class="">

				<section id="fieldsetArea" class="">
					<fieldset id="sessionInfo">
						
						<h3 id="topicIntroTitle" class="title is-3">Topic Introduction</h3>
						
						<div id="" class="inputSection">
							<label for="themeInput" class="label">THEME </label> 
						  <p class="control">
						    <input id="themeInput" class="input" type="text" placeholder="" required>
						  </p>
						  <small>The main topic connecting all the session questions</small>

						</div>

						<div class="sessionIntro">
							<label class="label" for="sessionIntro">SESSION INTRODUCTION </label>
						  <p class="control">
						    <textarea id="sessionIntro" name="sessionIntro" class="textarea" placeholder="" required></textarea>
						  </p>
						  <small>A brief explanation of the topic that frames the session</small>
						</div>

						<div class="keywordsInput">
							<label class="label" for="keywordsInput">KEYWORDS </label>
						  <p class="control">
						    <input id="keywordsInput" class="input" type="text" name="keywordsInput"  placeholder="Use , to separate keywords" required>
						  </p>
						  <small>Add related keywords to your topic to help your session be found by members looking for related ideas</small>						  
						</div>								
					</fieldset> <!-- sessionInfo -->

					<fieldset id="sessionQuestions" class="">
						<h3 class="title is-3">Table Topics</h3>
						
						<section id="topicQuestions">
							<div class="topicQuestion ">
								
								<section class="level">
									<label class="label level-item level-left" >QUESTIONS</label>
									<span id="addQuestion" class="level-item level-right" type="button">+Add a question</span>			
								</section>

							  <p class="control">
							    <textarea  class="topicQuestionInput textarea" placeholder="#1" required></textarea>	
							  </p>

							</div>

							<div class="topicQuestion ">
							  <p class="control">
							    <textarea  class="topicQuestionInput textarea" placeholder="#2" required></textarea>
							  </p>
							</div>

							<div class="topicQuestion ">
							  <p class="control">
							    <textarea  class="topicQuestionInput textarea" placeholder="#3" required></textarea>
							  </p>
							</div>

							<div class="topicQuestion ">
							  <p class="control">
							    <textarea  class="topicQuestionInput textarea" placeholder="#4" required></textarea>
							  </p>
							</div>

							<div class="topicQuestion ">
							  <p class="control">
							    <textarea  class="topicQuestionInput textarea" placeholder="#5" required></textarea>
							  </p>
							 					  
							</div>
						</section>
						<span class="instructionSpace">			
							<small>The best questions are often open ended, helping the speaker to respond creatively</small>	
						</span>
					</fieldset> <!-- sessionQuestions -->
					
			</section> 



			<section id="buttonHolder">

				<button id="topicSubmit" type="submit" class="button is-primary">Submit</button>				
			</section>
					
			</form> <!-- sessionSubmitForm -->	
		</div>	<!-- topicsSubmitArea -->
`
;		

function showTopicSubmitForm() {
	$('#displayArea').html(submitTopicForm);
}

// ************ Event Listeners **************

$('#sessionSubmitForm').submit(function(e){
	// console.log('session submit fired')
  e.preventDefault();

  let sessionDetails = {
		theme: $('#themeInput').val().trim(),
		sessionIntro: $('#sessionIntro').val().trim(),
		keywords: grabKeywords(),	
		questions: grabQuestions()
	};

	addNewSession(sessionDetails);
});

$('#displayArea').on('click', '#addQuestion', addQuestion);

$('#displayArea').on('click', '.delete', function(){
	$(this).parent().remove();
});
