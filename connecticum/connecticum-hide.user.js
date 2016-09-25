// ==UserScript==
// @name         Connecticum HIDE Script
// @namespace    https://github.com/Sly321
// @version      1.0
// @description  Adds two buttons to the rows, so you check and disable jobs you already applied or other stuff.
// @icon         http://www.connecticum.de/favicon.ico
// @author       Sly321
// @match        http://www.connecticum.de/jobsearchresult.php*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @grant        unsafeWindow
// @updateURL    https://raw.githubusercontent.com/Sly321/user-scripts/master/connecticum/connecticum-hide.user.js
// ==/UserScript==

(function() {
    'use strict';
	var relevantCookies = [];

    var list = $('.jobsearchlist > tbody > tr');
	//delete cookie
	var del_cookie = function (cname) {
		if (get_cookie (cname))
			document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	};
	//get cookie
	var get_cookie = function (cname) {
		var name = cname + "=";
		var ca = document.cookie.split (';');
		for (var i = 0; i < ca.length; i++)
		{
			var c = ca[i];
			while (c.charAt (0) == ' ')
				c = c.substring( 1);
			if (c.indexOf (name) === 0)
				return JSON.parse(c.substring (name.length, c.length));
		}
		return;
	};
    var set_cookie = function (cname, value) {
		var d = new Date();
		var exyears = 10;
		d.setTime (d.getTime () + (exyears*365*24*60*60*1000));
		var expires = "expires=" + d.toUTCString ();
		document.cookie = cname + "=" + JSON.stringify(value) + "; " + expires + "; path=/";
	};
	unsafeWindow.del_cookie = exportFunction(del_cookie, unsafeWindow);
	unsafeWindow.get_cookie = exportFunction(get_cookie, unsafeWindow);
	unsafeWindow.set_cookie = exportFunction(set_cookie, unsafeWindow);
	var addGlobalStyle = function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	};

	addGlobalStyle(".done { background: #d9d9d9 !important; }");
	addGlobalStyle(".done > td > a > img { opacity: 0.2; }");
	addGlobalStyle(".done > td > div > a { color: #b6b6b6; } ");
	addGlobalStyle(".done > td > span { color: #b6b6b6 !important;  } ");
	addGlobalStyle(".bad { background: #f4b3b3 !important; }");
	addGlobalStyle(".bad > td > a > img { opacity: 0.2; }");
	addGlobalStyle(".bad > td > div > a { color: #b6b6b6; } ");
	addGlobalStyle(".bad > td > span { color: #b6b6b6 !important;  } ");

	list.each(function() {
		var tableCell = $(document.createElement("td")).addClass("tac mobile-no-head");
		var tableCellCross = $(document.createElement("td")).addClass("tac mobile-no-head");
		var tableBtn = $(document.createElement("div")).html("<i class='fa fa-check' aria-hidden='true'></i>");
		tableBtn.css("color", "grey");
		tableBtn.css("cursor", "pointer");
		tableBtn.on("click", function() {
			var tableRow = this.parentElement.parentElement;
			console.log(tableRow);
			var id = tableRow.id;
			if(get_cookie(tableRow.id) == "check") {
				$(tableRow).removeClass("done");
				del_cookie(tableRow.id);
			}
			else {
				set_cookie(tableRow.id, "check");
				$(tableRow).addClass("done");
			}
		});
		var tableBtnCross = $(document.createElement("div")).html("<i class='fa fa-times' aria-hidden='true'></i>");
		tableBtnCross.css("color", "grey");
		tableBtnCross.css("cursor", "pointer");
		tableBtnCross.on("click", function() {
			var tableRow = this.parentElement.parentElement;
			console.log(tableRow);
			var id = tableRow.id;
			if(get_cookie(tableRow.id) == "bad") {
				$(tableRow).removeClass("bad");
				del_cookie(tableRow.id);
			}
			else {
				set_cookie(tableRow.id, "bad");
				$(tableRow).addClass("bad");
			}
		});
		$(this).append(tableCell.append(tableBtn));
		$(this).append(tableCellCross.append(tableBtnCross));
		if(get_cookie(this.id) == "check") {
			relevantCookies.push({ id: this.id, status: "check" });
			$(this).addClass("done");
		}
		else if(get_cookie(this.id) == "bad") {
			relevantCookies.push({ id: this.id, status: "bad" });
			$(this).addClass("bad");
		}
	});
	// Export Cookies
	var modalBtn = $(document.createElement("button")).html("Export").css("border", "1px solid grey").css("position", "absolute").css("top", "5px").css("left", "5px").css("z-index", "5000").css("background", "whitesmoke").on("click", function() {
		$(".sly-modal").css("display", "block");
		var htmlString = "";
		$(relevantCookies).each(function() {
			htmlString += "set_cookie('" + this.id + "','" + this.status + "');<br>";
		});
		$(".sly-modal").html(htmlString);
	});
	var modal = $(document.createElement("div")).addClass("sly-modal").css("display", "none").css("padding", "5px").css("position", "fixed").css("top", "150px").css("left", "calc(50% - 200px)").css("z-index", "5000").css("width", "400px").css("background", "white").css("height", "700px").css("box-shadow", "2px 2px 5px 0px black").css("overflow", "auto");
	$("body").append(modalBtn, modal);
})();