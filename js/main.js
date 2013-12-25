"use strict";
$(function() {

	// create codemirror javascript editor
	var editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
		lineNumbers: true
	});


	// handle navigation buttons
	$('.button').click(function(evt) {
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
				manager.newUrl(url);
			});
		})

		// save changes to old script and update editor with new scripts code
		// also check to see if editor should be visible
		.on('select', function(old, current) {
			check();
			if (old.size() > 0 && old[0].script.type === 'code') {
				old[0].script.code = editor.getValue();
			}

			if (current[0].script.type === 'code') {
				$('#codeUrlInstructions').addClass('hidden');
				$('#codeContainer').removeClass('hidden');
				editor.setValue(current[0].script.code);
			} else if (current[0].script.type === 'url') {
				$('#urlTitle').html('<a href="' + current[0].script.url + '">' + current[0].script.url + '</a>');
				$('#codeUrlInstructions').removeClass('hidden');
				$('#codeContainer').addClass('hidden');
			}

			$('#codeTitle').text(current[0].script.title);
		})

		// check to see if editor should be visible
		.on('delete', function(old, current) {
			check();
		});
	});

	// create compiler
	var compiler = new Compiler(codeManager, externManager, $('form'));

	$('#compile-code').click(function(evt) {
		// open wait dialogue TODO

		// send compilation request
		compiler.compile(function(data) {
			console.log(data);

			// fill table
			$('#compiledCode').text(data.compiledCode);
			$("#compile-time").text(data.statistics.compileTime);
			$("#request-time").text(0);
			$("#total-time").text(data.statistics.compileTime);
			$("#error-count").text(data.error && data.errors.length || 0)
			$("#warning-count").text(data.warnings && data.warnings.length || 0);
			$("#code-url").html("<a href='http://closure-compiler.appspot.com"+ data.outputFilePath + "' target='_blank'>here</a>");

			// calculate stuff to fill graph
			var origNorm = data.statistics.originalSize,
				origGzip = data.statistics.originalGzipSize,
				compNorm = data.statistics.compressedSize,
				compGzip = data.statistics.compressedGzipSize;
			var max = Math.max(origNorm, origGzip, compNorm, compGzip);

			// fill graph
			$('#origNorm').attr('data-size', origNorm / 1000 + 'kb').css('height', origNorm/max * 100 + "px");
			$('#origGzip').attr('data-size', origGzip / 1000 + 'kb').css('height', origGzip/max * 100 + "px");
			$('#compNorm').attr('data-size', compNorm / 1000 + 'kb').css('height', compNorm/max * 100 + "px");
			$('#compGzip').attr('data-size', compGzip / 1000 + 'kb').css('height', compGzip/max * 100 + "px");

			// fill errors TODO

			// fill warnings TODO

			//close wait dialogue TODO

			// open page and code textarea by clicking buttons
			$("[data-target=#result]").click();
			$("[data-target="+(data.errors ? "#compiled" : "problems")+"]").click();

		}, function(message, object, code) {
			console.log(message, object, code);
		});
	});
});