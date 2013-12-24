$.fn.scriptify = function(title) {
	var container = this;
	var current;
	var listeners = {};

	var object = {
		on : function(event, fn) {
			if (listeners[event]) {
				listeners[event].push(fn);
			} else {
				listeners[event] = [fn];
			}
			return this;
		},
		newScript : function(title, code) {
			var scriptElement = $(
				"<div class='script-element'>\
					" + title + "\
					<span class='delete'></span>\
				</div>"
				)
				.delegate('.delete', 'click', function(evt) {
					var index = $('.script-element').index($('.script-element.selected'));
					scriptElement.remove();
					dispatch('delete', []);

					// select next one
					var size = $('.script-element').size();
					if (size > 0) {
						if (index === size) {
							$('.script-element').get(index - 1).click();
						} else if (size > 0) {
							$('.script-element').get(index).click();
						}
					}
				});

			container.children('.script-options')
				.append(scriptElement)
				.sortable();
			scriptElement[0].script = {
				title : title,
				code : code
			};
			scriptElement.click();
		}
	}

	var dispatch = function(event, args) {
		if (listeners[event]) {
			$.each(listeners[event], function(index, fn) {
				fn.apply(object, args);
			});
		}
	}

// add inside html
	container
		.addClass('script-container')
		.html(
"<h3>" + title + "</h3>\
<button class='left control' data-event='custom'>custom</button>\
<button class='mid control' data-event='upload'>upload</button>\
<button class='right control' data-event='url'>url</button>\
<ul class='script-options'></ul>"
		)
		.delegate('.control', 'click', function(evt) {
			var button = $(this);
			dispatch(button.attr('data-event'), [button] );
		})
		.delegate('.script-element', 'click', function(evt) {
			var old = $('.script-element.selected')
			$('.script-element').removeClass('selected');
			$(this).addClass('selected');
			dispatch('select', [old, $(this)]);
		});


	return object;
}