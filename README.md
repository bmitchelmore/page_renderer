Page Renderer
=============

I've always wanted to be able to construct well formatted HTML so I wrote something that does it. It uses a pretty obvious object form to describe HTML documents, and I recently integrated a variant of John Resig's simple html parser, one that supports a few of the weird edge cases of html. The resulting rendered html tried to construct a more valid output for those sorts of pages. For example:

	var renderer = require('page_renderer');
	renderer.render('<title>Title</title><h1>Heading</h1>') == "<!DOCTYPE html>\n<html><head><title>Title</title></head><body><h1>Heading</h1></body></html>"

This output is more correct from the standpoint of interoperability and so the increased verbosity is, as far as I'm concerned totally worth it. After constructing well formatted HTML, I realized this makes it super easy to generate well minified data as well. This means using void attributes when able, removing default value attributes, organizing attributes alphabetically in order to aid huffman coding and compression, and of course removing newlines and tabs. A lot of the logic behind some of these smarter compressions is not in place yet, but the structure for it is.
