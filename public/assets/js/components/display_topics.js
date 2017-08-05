$('#displayTopics').on('click', '.tableTopicSession', function(){
	let ttSession = this;
	if (!$(this).find('.introductionlabel').hasClass('is-hidden')) {
		$(this).find('.introductionlabel').toggleClass('is-hidden');
		$(this).find('.introductionData').toggleClass('is-hidden');
		$(this).find('.questionsLabel').toggleClass('is-hidden');
		$(this).find('.questionsData').toggleClass('is-hidden');
		TweenLite.to($(this), 0.2, {height: "105px", onComplete: function(){
			$(ttSession).removeAttr('style');
		}});
		return;
	} 

	$('.tableTopicSession .introductionlabel').addClass('is-hidden');
	$('.tableTopicSession .introductionData').addClass('is-hidden');
	$('.tableTopicSession .questionsLabel').addClass('is-hidden');
	$('.tableTopicSession .questionsData').addClass('is-hidden');

	$(this).find('.introductionlabel').toggleClass('is-hidden');
	$(this).find('.introductionData').toggleClass('is-hidden');
	$(this).find('.questionsLabel').toggleClass('is-hidden');
	$(this).find('.questionsData').toggleClass('is-hidden');
	
	TweenLite.to($('.tableTopicSession'), 0.4, {height: '105px', onComplete: function(){
		$('.tableTopicSession').removeAttr('style');
	}})
	TweenLite.from($(this), 0.4, {delay: 0.2, height:"98px"});
	
});