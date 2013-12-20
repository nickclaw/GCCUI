"use strict";

$(function() {

	$('.button').click(function(evt) {
		var button = $(this);
		button.addClass('selected').siblings().removeClass('selected');

		var target = button.attr('data-target');
		var action = button.attr('data-action');

		$(target).addClass(action).siblings().removeClass(action);
	});

	

});