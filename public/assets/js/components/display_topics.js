$('#displayTopics').on('click', '.tableTopicSession', function(){
	if (!$(this).find('.introductionlabel').hasClass('is-hidden')) {
		$(this).find('.introductionlabel').toggleClass('is-hidden');
		$(this).find('.introductionData').toggleClass('is-hidden');
		$(this).find('.questionsLabel').toggleClass('is-hidden');
		$(this).find('.questionsData').toggleClass('is-hidden');
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

	// TweenLite.from($(this).find('.introductionlabel'), 2, {width:"auto", height:"0px"});
	// TweenLite.from($(this).find('.introductionData'), 2, {width:"auto", height:"0px"});
	// TweenLite.from($(this).find('.questionsLabel'), 2, {width:"auto", height:"0px"});
	// TweenLite.from($(this).find('.questionsData'), 2, {width:"auto", height:"0px"});


});