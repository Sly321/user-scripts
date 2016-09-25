// ==UserScript==
// @name         Ran URL Script
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Zeigt die scheiß url's an.
// @author       Sly321
// @match        http://www.ran.de/us-sport/nfl/live/*
// @require		 https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/Sly321/user-scripts/master/ran/ran.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	
	var div = $(document.createElement("div"));
	div.css("position", "fixed");
	div.css("top", "150px");
	div.css("left", "calc(50% - 250px)");
	div.css("width", "500px");
	div.css("padding", "5px");
	div.css("height", "200px");
	div.css("display", "none");
	div.attr("id", "test");
	div.css("z-index", "5000");
	div.css("background", "white");
	div.css("border", "3px solid grey");
	div.css("word-wrap", "break-word");
	div.css("font-family", "monospace");

	setTimeout(function() {
		$("body").append(div);
		var text = $("#container_player").children()[0].children[1].innerHTML;
		div.html(text);
		div.css("display", "block");
	}, 1000);
})();