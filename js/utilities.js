// opens the systems default file picker, calls onchange callback with FileList of chosen file(s)
// TODO make sure this trick works on all browsers (tested on Chrome 31, Safari 7)
function openFileDialogue(onchange) {
	$( document.createElement('input') )
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

// opens a dialogue box for URL input
// TODO make it actually work well and be customizable
function openUrlDialogue(onurl) {
	$(document.body).append(
		$(
"<div class='overlay'></div>\
<div class='dialogue'>\
<h3>Enter a URL</h3>\
<div>\
	<input />\
</div>\
<button class='right control' data-event='add'>add</button>\
<button class='left control' data-event='cancel'>cancel</button>\
</div>"
		)
		.delegate('.control', 'click', function(evt) {
			var button = $(this);
			if (button.data().event === 'cancel') {
				$('.overlay, .dialogue').remove();
			} else if (button.data().event === 'add') {
				onurl.call(this, $('.dialogue input').val());
				$('.overlay, .dialogue').remove();
			}
		})
	);
}