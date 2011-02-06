var PageRenderer = function(minified) {
	this.minified = minified;
};

PageRenderer.prototype = {
	booleans: { // incomplete list, obviously
		'style': {
			'scoped': true
		}
	},
	boolean: function (element, attribute) {
		return !!((this.booleans[element.tag] || {})[attribute]);
	},
	blanks: { // complete list
		area: true, 
		base: true,
		br: true, 
		col: true, 
		command: true, 
		embed: true, 
		hr: true, 
		img: true, 
		input: true, 
		keygen: true, 
		link: true, 
		meta: true, 
		param: true, 
		source: true, 
		track: true, 
		wbr: true
	},
	blank: function (element) {
		return this.blanks[element.tag];
	},
	defaults: { // incomplete list, obviously
		'style': {
			'type': 'text/css',
			'media': 'all'
		}
	},
	defaulted: function(element, attribute, value) {
		return ((this.defaults[element.tag] || {})[attribute] == value);
	},
	start: function(element) {
		var tag = ['<', element.tag];
		if (element.attr) {
			var attrs = [];
			for (var key in element.attr) { attrs.push(key); }
			if (attrs.length) {
				attrs.sort();
				for (var i = 0; i < attrs.length; ++i) {
					var key = attrs[i];
					var value = element.attr[key];
					if (this.boolean(element, key)) {
						tag.push(' ');
						tag.push(key);
					} else if (!this.minified || !this.defaulted(element, key, value)) {
						tag.push(' ');
						tag.push(key);
						tag.push('=');
						tag.push('"');
						tag.push(value);
						tag.push('"');
					}
				}
			}
		}
		tag.push('>');
		return tag.join('');
	},
	end: function(obj) {
		return ['</', obj.tag, '>'].join('');
	},
	indented: function(level) {
		if (this.minified) return "";
		var list = [];
		for (var i = 0; i < level; ++i) {
			list.push("\t");
		}
		return list.join("");
	},
	process: function(element, indent) {
		var lines = [];
		if (element.content) {
			lines.push(this.indented(indent) + this.start(element));
			lines.push(element.content);
			lines.push(this.end(element));
		} else if (this.blank(element)) {
			lines.push(this.indented(indent) + this.start(element));
		} else {
			lines.push(this.indented(indent) + this.start(element));
			if (element.children) {
				if (!this.minified) lines.push("\n");
				for (var i = 0; i < element.children.length; ++i) {
					var child = this.process(element.children[i], indent + 1);
					lines.push(child);
					if (!this.minified) lines.push("\n");
				}
			}
			lines.push(this.indented(indent) + this.end(element));
		}
		return lines.join('');
	},
	render: function(page) {
		page.tag = 'html';
		var result = ["<!DOCTYPE html>\n", this.process(page, 0)].join("");
		return result;
	}
};

exports.render = function(page, minified) {
	return new PageRenderer(minified).render(page);
};