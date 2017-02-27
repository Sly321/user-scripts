function addGlobalStyle(css) {
	var head, style;
	head = document.querySelector("head");
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function addStyle() {
	addGlobalStyle(".import-row { background: #f0f0f0; } .import-row:hover { text-decoration: underline; color: blue; cursor: pointer; } ");
}

/** Main Method */
if (typeof $ !== 'undefined') {
	$(document).ready(() => {
		addStyle();
	});
}
