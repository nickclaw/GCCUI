/**
 * in charge of managing a list of scripts
 * returned variable exposes ability to add new scripts and listen for custom events
 * events so far : delete, select, and the data-event of any `button.control` elements added
 */
$.fn.scriptify = function() {
	var container = this;

	// for events...
	var listeners = {};
	var dispatch = function(event, args) {
		if (listeners[event]) {
			$.each(listeners[event], function(index, fn) {
				fn.apply(object, args);
			});
		}
	}

	// add delegates to the container
	// delegating is easier than listening to each element individually
	container

		// listen for button clicks
		// dispatch event based on data-events value
		.delegate('.control', 'click', function(evt) {
			var button = $(this);
			dispatch(button.attr('data-event'), [button] );
		})

		// listen for script selection
		// dispatch event with old scripts and new scripts jQuery objects
		.delegate('.script-element', 'click', function(evt) {
			var old = $('.script-element.selected')
			$('.script-element').removeClass('selected');
			$(this).addClass('selected');
			dispatch('select', [old, $(this)]);
		});


	// create object to expose some properties and functions
	var object = {

		// for event listening
		on : function(event, fn) {
			if (listeners[event]) {
				listeners[event].push(fn);
			} else {
				listeners[event] = [fn];
			}
			return this;
		},

		// create and add a new script
		newScript : function(title, code, url) {

			// create a new script element
			var scriptElement = $('<div>')
				.addClass('script-element')
				.text(title)

				// add a delete button
				.append( $('<span>')
					.addClass('delete')
					.click(function(evt) {
						var index = $('.script-element').index(scriptElement); // get this before we delete it
						scriptElement.remove();

						dispatch('delete', []);

						// select the next element
						var size = $('.script-element').size();
						if (size > 0 && scriptElement.hasClass('selected')) {
							$('.script-element').get(index === size ? index - 1 : index).click();
						}
					})
				);

			// append the new script to the list
			// and make sure it's sortable
			container.children('.script-options')
				.append(scriptElement)
				.sortable();

			var script = { title : title };
			if ( code !== null ) {
				script.code = code;
				script.type = 'code';
			}
			if ( url ) {
				script.url = url;
				script.type = 'url';
			}

			// bond the script data to the element
			scriptElement[0].script = script;

			// finally autoclick the new script element
			scriptElement.click();
		},

		newUrl : function(url) {
			var title = url.match(/[a-zA-z\-\.]*\.js$/) || (url.length > 15 ? '...'+url.slice(url.length - 12) : url);
			this.newScript(title, null, url)
		},

		getScripts : function() {
			return container
				.find('.script-element')
				.map(function(index, element) {
					return element.script;
				})
				.toArray();
		}
	}

	// expose properties, must save this object
	return object;
}