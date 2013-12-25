function Compiler(scripts, externs, form) {
	this.scriptManager = scripts;
	this.externManager = externs;
	this.settings = form;

	var self = this;

	this.compile = function(onsuccess, onerror) {

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

		// push each extern into settings
		$.each(externs, function(index, value) {
			if (value.type === 'url') { // for urls
				settings.push({
					name : 'externs_url',
					value : value.url
				});
			} else if (value.type === 'code') {
				settings.push({
					name : 'js_externs',
					value : encodeURIComponent(value.code)
				});
			}
		});

		// push each script into settings
		$.each(scripts, function(index, value) {
			if (value.type === 'url') { // for urls
				settings.push({
					name : 'js_url',
					value : value.url
				});
			} else if (value.type === 'code') {
				settings.push({
					name : 'js_code',
					value : encodeURIComponent(value.code)
				});
			}
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
			var jsonData;
			try {
				jsonData = JSON.parse(data);
			} catch (e) {
				// google must've returned something like:
				// Error(18): .....
				// try to parse it and call on the onerror handler passing the error, coorresponding error object, and the code
				var error = data.match(/^Error\(([0-9]*)\):\ (.*)/) || [];
				var errorCode = error[1] || -1;
				var errorMessage = error[2] || "Uknown error.";
				var errorObject = error_codes[errorCode] || {
					error : errorMessage,
					description : 'Google returned something we didn\'t understand. Sorry!'
				}

				onerror.call(null, errorMessage, errorObject, errorCode);
				return;
			}
			onsuccess.call(null, jsonData);
		}, 'text');
	}
}