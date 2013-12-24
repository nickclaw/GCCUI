"use strict";

$(function() {

	var editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
		lineNumbers: true
	});

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
	var codeCount = 0
	var externCount = 0;
	var codeManager = $("#codeOptions").scriptify('code')
		.on('custom', function(button) {
			this.newScript('custom-script-'+(codeCount++)+'.js', '// your custom javascript here');
		})
		.on('upload', function(button) {
			var manager = this;
			openFileDialogue(function(evt) {
				var filelist = evt.target.files;
				$.each(filelist, function(index, file) {
					if (file.name.match(/\.js$/)) {

						readFile(file, function(evt) {
							manager.newScript(file.name, evt.target.result);
						});

					}
				});
			})
		})
		.on('url', function(evt) {

		})
		.on('select', function(old, current) {
			check();
			if (old.size() > 0) {
				old[0].script.code = editor.getValue();
			}
			editor.setValue(current[0].script.code);
		})
		.on('delete', function(old, current) {
			check();
		});
	var externManager = $("#externOptions").scriptify('externs')
		.on('custom', function(button) {
			this.newScript('custom-extern-'+(externCount++)+'.js', '// your custom javascript here');
		})
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
		.on('select', function(old, current) {
			check();
			if (old.size() > 0) {
				old[0].script.code = editor.getValue();
			}
			editor.setValue(current[0].script.code);
		})
		.on('delete', function(old, current) {
			check();
		});
});