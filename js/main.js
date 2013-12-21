"use strict";

$(function() {

	var editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
		lineNumbers: true
	});

	var manager = new ScriptManager(editor);

	// register navigation buttons
	$('#nav .button').click(function(evt) {
		var button = $(this);
		button.addClass('selected').siblings().removeClass('selected');

		var target = button.attr('data-target');
		var action = button.attr('data-action');

		uniqueSet($(target), action);
	});

	$('#codeTitle').on('input', function(evt) {
		manager.current.title(this.innerHTML);
	});

	$('#customScript').click(function() {
		manager.addScript(
			manager.createScript()
				.title('custom script ' + manager.count)
				.code('// your custom javascript here')
		);
	});

	$('#uploadScript').click(function() {
		// open file dialogue
		openFileDialogue(function(evt) {
				var filelist = evt.target.files;

				$.each(filelist, function(index, file) {
					if (file.name.match(/\.js$/)) {

						readFile(file, function(evt) {
							manager.addScript(
								manager.createScript()
									.title(file.name)
									.code(evt.target.result)
							);
						});

					}
				});

			});
	});

	$('#urlScript').click(function() {
		//open popup
	});
});