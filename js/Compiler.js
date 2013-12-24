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

		console.log(settings, js_code);
	}
}