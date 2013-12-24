"use strict";

$(function() {

	// create codemirror javascript editor
	var editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
		lineNumbers: true
	});


	// handle navigation buttons
	$('#nav .button').click(function(evt) {
		var button = $(this);
		button.addClass('selected').siblings().removeClass('selected');

		var target = button.attr('data-target');
		var action = button.attr('data-action');

		$(target)
			.addClass(action)
			.siblings()
				.removeClass(action);
	});


	// this function is used to check for scripts/externs
	// if there is none it shows the instructions
	// otherwise it shows the editor
	var check = function() {
		if ($('.script-element').size() !== 0 ) {
			$('#codeInstructions').addClass('hidden');
			$('#codeContainer').removeClass('hidden');
			$('')
		} else {
			$('#codeInstructions').removeClass('hidden');
			$('#codeContainer').addClass('hidden');
		}
	}

	// initialize variables to keep track of number of scripts generated
	var codeCount = 0
	var externCount = 0;


	// create code manager and apply unique listeners
	var codeManager = $("#codeOptions").scriptify()
		.on('custom', function(button) {
			this.newScript('custom-script-'+(codeCount++)+'.js', '// your custom javascript here');
		});
	
	// create extern manager and apply unique listeners
	var externManager = $("#externOptions").scriptify('externs')
		.on('custom', function(button) {
			this.newScript('custom-extern-'+(externCount++)+'.js', '// your custom javascript here');
		});

	// apply common listeners
	$.each([codeManager, externManager], function(index, manager) {
		manager

			// open a file dialogue and create a new script for each .js/.json file uploaded
			.on('upload', function(button) {
			var manager = this;
			openFileDialogue(function(evt) {
				var filelist = evt.target.files;
				$.each(filelist, function(index, file) {
					if (file.name.match(/\.js(on)?$/)) {

						readFile(file, function(evt) {
							manager.newScript(file.name, evt.target.result);
						});

					}
				});
			})
		})

		// open a url dialogue and create a script for imported text
		// TODO make it work
		.on('url', function(evt) {
			openUrlDialogue(function(url) {
				$.ajax(url, {
					success : function() {
						console.log(this, arguments);
					},
					crossDomain : true
				});
			});
		})

		// save changes to old script and update editor with new scripts code
		// also check to see if editor should be visible
		.on('select', function(old, current) {
			check();
			if (old.size() > 0) {
				old[0].script.code = editor.getValue();
			}
			editor.setValue(current[0].script.code);
		})

		// check to see if editor should be visible
		.on('delete', function(old, current) {
			check();
		});
	});
});