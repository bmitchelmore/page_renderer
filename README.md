Page Renderer
=============

I've always wanted to be able to construct well formatted HTML so I wrote something that does it. It uses a pretty obvious object form to describe HTML documents, but it's pretty limited because this means you can't use plain HTML. I'll probably integrate an HTML parser that generates a page model at some point.

After constructing well formatted HTML, I realized this makes it super easy to generate well minified data as well. This means using void attributes when able, removing default value attributes, organizing attributes alphabetically in order to aid huffman coding and compression, and of course removing newlines and tabs. A lot of the logic behind some of these smarter compressions is not in place yet, but the structure for it is.
