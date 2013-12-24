function Compiler(scripts, externs, form) {
	this.scriptManager = scripts;
	this.externManager = externs;
	this.settings = form;

	var self = this;

	this.compile = function(callback) {

		// read form
		var settings = self.settings.serializeArray();

		// get scripts
		var externs = self.externManager.getScripts();
		var scripts = self.scriptManager.getScripts();


		// add noncustomizable settings
		settings.push({
			name : 'output_format',
			value : 'json'
		});
		settings.push({
			name : 'language',
			value : 'ECMASCRIPT3'
		});
		$.each(['compiled_code', 'warnings', 'errors', 'statistics'], function(index, value) {
			settings.push({
				name : 'output_info',
				value : value
			});
		});

		// concatenate externs into js_externs while building array externs_url's
		var externs_url = [];
		var js_externs = externs.reduce(function(prev, curr, index, array) {
			if (false) {
				externs_url.push(curr.url);
				return prev;
			} else {
				return prev + "\n" + curr.code;
			}
		}, "");

		// concatenate scripts into js_code while building array of code_url's
		var code_url = [];
		var js_code = scripts.reduce(function(prev, curr, index, array) {
			if (false) { // if is just a url
				code_url.push(curr.url);
				return prev;
			} else {
				return prev + "\n\n" + curr.code;
			}
		}, "/** @preserve compiled using the GccUI */\n");


		// add each url to settings
		$.each(externs_url, function(index, value) {
			settings.push({
				name : 'externs_url',
				value : value
			})
		});
		$.each(code_url, function(index, value) {
			settings.push({
				name : 'code_url',
				value : value
			});
		});


		// add code and externs to settings
		settings.push({
			name : 'js_externs',
			value : encodeURIComponent(js_externs)
		})
		settings.push({
			name : 'js_code',
			value : encodeURIComponent(js_code)
		});

		// concatenate settings into post data
		var postData = settings.reduce(function(prev, curr, index, array) {
			if (curr.value) {
				return prev + curr.name + '=' + curr.value + (array.length - 1 > index ? '&' : '');
			} else {
				return prev;
			}
		}, "");

		$.post('http://closure-compiler.appspot.com/compile', postData, function(data, status, xhr) {
			console.log(data);
		}, 'json');
	}
}