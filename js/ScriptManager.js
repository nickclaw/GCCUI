/**
 * object to manage all scripts and script elements
 * @constructor
 */
function ScriptManager(editor) {

	this.scripts = [];
	this.current = null;
	this.count = 0;
	this.editor = editor;

	var check = function() {
		if ( self.scripts.length !== 0 ) {
			$('#codeContainer').removeClass('hidden');
			$("#codeInstructions").addClass('hidden');
		} else {
			$('#codeContainer').addClass('hidden');
			$("#codeInstructions").removeClass('hidden');
		}
	}

	var self = this;

	/**
	 *
	 *
	 */
	this.createScript = function(code, title) {
		var code = code || "";
		var title = title || "";
		var element = document.createElement('div');

		$(element).addClass('script-element')
			.append(
				$(document.createElement('span'))
			)
			.children('span').text(title);

		var script = {
			element: function() {
				return element;
			},
			code: function(newCode) {
				if (newCode !== undefined) {
					code = newCode;
					return this;
				} else {
					return code;
				}
			},
			title: function(newTitle) {
				if (newTitle !== undefined) {
					title = newTitle;
					$(element).children('span').text(title);
					return this;
				} else {
					return title;
				}
			}
		}

		element.getScript = function() {
			return script;
		}

		self.count++;

		return script;
	}

	this.addScript = function(script) {
		self.scripts.push(script);
		check(); // do this before selecting anything, or else stuff might not draw

		$('#codeOptions')
			.append(
				$(script.element())
					.attr('data-parent', '#codeOptions')
					.append(
						$(document.createElement('div'))
							.addClass('delete')
							.click(function() {
								self.removeScript(script);
							})
					)
					.click( function(evt) {
						// save old script
						if (self.current) {
							self.current
								.code( self.editor.getValue() )
								.title( $('#codeTitle').text() );
						}

						// load new script
						var item = $(this);
						var script = this.getScript();
						self.current = script;
						uniqueSet(item, 'selected');
						self.editor.setValue( script.code() );
						$("#codeTitle").text( script.title() );
					})
					.click()
			)
			.sortable();
	}

	this.removeScript = function(script) {
		var elementIndex = $('.script-element.selected').index();
		var scriptIndex = self.scripts.indexOf(script);

		if (scriptIndex >= 0) {
			self.scripts.splice(scriptIndex, 1);
			$(script.element()).remove();

			if (self.current === script && self.scripts.length > 0) {
				if (elementIndex === self.scripts.length) {
					$('.script-element').get(elementIndex - 1).click();
				} else {
					$('.script-element').get(elementIndex).click();
				}
			}
		}

		check();

	}
}