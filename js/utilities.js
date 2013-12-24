function uniqueSet(target, cls) {
	var parent = target.attr('data-parent')?$(target.attr('data-parent')):target.parent();
	parent.children().removeClass(cls);
	target.addClass(cls);
}

function openFileDialogue(onchange) {
	$( document.createElement('input') )
		.attr('type', 'file')
		.attr('multiple', 'multiple')
		.on('change', onchange)
		.click();
}

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

function loadScript(url) {
	$.get(url, function() {
		console.log(this, arguments);
	});
}

function readFile(file, callback) {
	reader = new FileReader();
	reader.onload = function(evt) {
		callback.call(file, evt)
	}
	reader.readAsText(file);
}