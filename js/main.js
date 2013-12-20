"use strict";
var editor;
$(function() {

	// register buttons
	$('.button').click(function(evt) {
		var button = $(this);
		button.addClass('selected').siblings().removeClass('selected');

		var target = button.attr('data-target');
		var action = button.attr('data-action');

		$(target).addClass(action).siblings().removeClass(action);
	});

	// create codemirror javascript editor
	var editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
		lineNumbers: true
	});

	
});