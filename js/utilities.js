function uniqueSet(target, cls) {
	$(target.attr('data-parent')).children().removeClass(cls);
	target.addClass(cls);
}

function openFileDialogue(onchange) {
	$( document.createElement('input') )
		.attr('type', 'file')
		.attr('multiple', 'multiple')
		.on('change', onchange)
		.click();
}

function readFile(file, callback) {
	reader = new FileReader();
	reader.onload = function(evt) {
		callback.call(file, evt)
	}
	reader.readAsText(file);
}