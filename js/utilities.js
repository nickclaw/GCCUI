// opens the systems default file picker, calls onchange callback with FileList of chosen file(s)
// TODO make sure this trick works on all browsers (tested on Chrome 31, Safari 7)
function openFileDialogue(onchange) {
	$('<input>')
		.attr('type', 'file')
		.attr('multiple', 'multiple')
		.on('change', onchange)
		.click();
}

// used a FileReader object to convert a Blob into utf-8 text
// calls callback with @this as the file
function readFile(file, callback) {
	reader = new FileReader();
	reader.onload = function(evt) {
		callback.call(file, evt)
	}
	reader.readAsText(file);
}

/**
 * Open a dialogue box
 * param title = string
 * param buttons = string array
 * param content = jqueryable object
 * param doSettings = callback(dialougue jquery, overlay jquery)
 */
function openDialogue(title, buttons, content, doSettings) {
	$(document.body)
		.append(
			$('<div>').addClass('overlay'),
			$('<div>').addClass('dialogue')
				.append(
					$('<h3>').text(title),
					$(content),
					$('<div>')
						.css('text-align', 'right')
						.append(
							$.map(buttons, function(string, value) {
								return $('<button>')
									.addClass('control')
									.attr('data-event', string)
									.text(string)
							})
						)
				)
		);
	doSettings.call(null, $('.dialogue'), $('.overlay'));

}

// opens a dialogue box for URL input
function openUrlDialogue(onurl) {
	openDialogue('Enter a URL', ['cancel', 'add'], $('<input>'), function(dialogue, overlay) {
		dialogue
			.delegate('.control', 'click', function(evt) {
				var button = $(this);
				if (button.data().event === 'add') {
					onurl.call(this, $('.dialogue input').val());
				}

				dialogue.remove();
					overlay.remove();
			})
	});
}