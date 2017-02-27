(function() {
    'use strict';

	let getLinkFromImportElement, openUrlInNewTab, getHtmlLink,
	replaceJavaWithHtml, buildDocLink, getJavaxDocLink,
	getJavaxAnnotationDocLink, getJavaUtilDocLink, getJavaIoDocLink,
	getJavaBeanDocLink, handleSchultraegerportal, handleEudSchule,
	handleThirdpartyImport, navigateTo;

	let JAVAX_LINK     = "https://docs.oracle.com/javaee/7/api/";
	let JAVA_BEAN      = "https://docs.oracle.com/javase/7/docs/api/";
	let JAVA_IO_LINK   = "https://docs.oracle.com/javase/7/docs/api/";
	let JAVA_UTIL_LINK = "https://docs.oracle.com/javase/7/docs/api/";

	function isSrcImport(link) {
		var regex = /senbjw|isbj|eud|schule|verwalt_berlin/g;
		var javax = /javax.faces|java.util|javax.annotation|java.io|java.beans/g;
		if(link.match(regex) || link.match(javax)) {
			return true;
		} else {
			return false;
		}
	}

	navigateTo = (javaLink) => {
		javaLink += ".java";
		var originalPath = window.location.pathname.split("/");
		var projectName = originalPath[4];

		switch(projectName) {
			case "eud-schule":
				return handleEudSchule(originalPath, javaLink);
			case "schultraegerportal":
				return handleSchultraegerportal(originalPath, javaLink);
			default:
				return handleThirdpartyImport(originalPath, javaLink);
		}
	};

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* * * * * * * * * * * * * * * * * * * * * * * * * Own    Libraries  */
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	/** SCHULTRAEGER **/
	handleSchultraegerportal = (rootPath, sourceLink) => {

		var eudSchuleServiceRegex = /schule\/service\//g;

		if(sourceLink.match(false)) {
		} else if(sourceLink.match(eudSchuleServiceRegex)) {
			console.log("schultraegerportal-services");
			rootPath[6] = "schultraegerportal-services";
		} else {
			return handleThirdpartyImport(sourceLink);
		}

		var subPath = rootPath.slice(0, rootPath.indexOf("java") + 1);
		window.location.pathname = subPath.join("/") + "/" + sourceLink;
		return true;
	};

	/** EUD SCHULE **/
	handleEudSchule = (rootPath, sourceLink) => {

		var stpSharedSchuleRegex  = /stp\/shared\/schule/g;
		var eudSchuleWebappRegex  = /schule\/web\/controller|schule\/web\/converter|schule\/web\/filter|schule\/web\/job|schule\/web\/servlet|schule\/web\/table|schule\/web\/user|schule\/web\/validator/g;
		var eudSchuleModelRegex   = /schule\/converter\/|schule\/dto\/|schule\/enums\/|schule\/model\/|schule\/shared\/|schule\/util\//g;
		var eudSchuleServiceRegex = /schule\/service\//g;

		if(sourceLink.match(stpSharedSchuleRegex)) {
			console.log("stp-shared-schule link");
			rootPath[4] = "stp-shared-schule";
			rootPath.splice(6, 1);
		} else if(sourceLink.match(eudSchuleWebappRegex)) {
			console.log("webapp link");
			rootPath[6] = "eud-schule-webapp";
		} else if(sourceLink.match(eudSchuleModelRegex)) {
			console.log("model link");
			rootPath[6] = "eud-schule-model";
		} else if(sourceLink.match(eudSchuleServiceRegex)) {
			console.log("eud-schule-services");
			rootPath[6] = "eud-schule-services";
		} else {
			return handleThirdpartyImport(sourceLink);
		}

		var subPath = rootPath.slice(0, rootPath.indexOf("java") + 1);
		window.location.pathname = subPath.join("/") + "/" + sourceLink;
		return true;
	};

	/**
	 * Third Party import
	 */
	handleThirdpartyImport = (sourceFileLink) => {
		var javax           = /javax\/faces\//g;
		var javaxAnnotation = /javax\/annotation\//g;
		var javau           = /java\/util\//g;
		var javaio          = /java\/io\//g;
		var javabeans       = /java\/beans\//g;

		var url = "https://www.google.de/search?q=";

		// javax.faces.*
		if(sourceFileLink.match(javax)) {
			url = getJavaxDocLink(sourceFileLink);

		// java.util.*
		} else if(sourceFileLink.match(javau)) {
			url = getJavaUtilDocLink(sourceFileLink);

		// javax.annotation.*
		} else if(sourceFileLink.match(javaxAnnotation)) {
			url = getJavaxAnnotationDocLink(sourceFileLink);

		// java.io.*
		} else if(sourceFileLink.match(javaio)) {
			url = getJavaIoDocLink(sourceFileLink);

		// java.beans.*
		} else if(sourceFileLink.match(javabeans)) {
			url = getJavaBeanDocLink(sourceFileLink);

		// google.*
		} else {
			url += sourceFileLink;
		}

		return openUrlInNewTab(url);
	};

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* * * * * * * * * * * * * * * * * * * * * * * * * Oracle Libraries  */
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	getJavaxDocLink = function(javaLink) {
		console.log("javax builder");
		return buildDocLink(JAVAX_LINK, javaLink, 3);
	};

	getJavaxAnnotationDocLink = function(javaLink) {
		console.log("javax annot. builder");
		return buildDocLink(JAVAX_LINK, javaLink, 2);
	};

	getJavaUtilDocLink = function(javaLink) {
		console.log("java util. builder");
		return buildDocLink(JAVA_UTIL_LINK, javaLink, 2);
	};

	getJavaIoDocLink = function(javaLink) {
		console.log("java io builder");
		return buildDocLink(JAVA_IO_LINK, javaLink, 2);
	};

	getJavaBeanDocLink = function(javaLink) {
		console.log("java bean builder");
		return buildDocLink(JAVA_BEAN, javaLink, 2);
	};

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	buildDocLink = function(docUrl, fileUrl, slice) {
		return docUrl + getHtmlLink(replaceJavaWithHtml(fileUrl), slice);
	};

	replaceJavaWithHtml = function(link) {
		link = link.split("/");
		var length = link.length - 1;
		link[length] = link[length].replace(".java", ".html");
		return link;
	};

	getHtmlLink = function(str, slice) {
		return `${str.slice(0, slice).join("/")}/${str.slice(slice, str.length).join(".")}`;
	};

	openUrlInNewTab = function(url) {
		var win = window.open(url, '_blank');
		win.focus();
		return true;
	};

    /**
     * Should be obvious what this method does, if you taek a quick look at the code.
     */
    function getAllImportsAndSetClassName() {
        return Array.prototype.filter.call(document.querySelectorAll(".cm-keyword"), o => {
			if(o.innerHTML === "import" && isSrcImport(getLinkFromImportElement(o.parentElement))) {
				return o;
			}
		}).map(o => {
			o.parentElement.classList.add("import-row");
			o.parentElement.onclick = (e) => {
				navigateTo(getLinkFromImportElement(e.target));
			};
			return o.parentElement;
		});
    }

	/* Returns a joined string from all children elements with class .cm-variable */
	getLinkFromImportElement = function(element) {
		if(element.querySelector(".cm-variable") === null) {
			element = element.parentElement;
		}
		return Array.prototype.map.call(element.querySelectorAll(".cm-variable"), (o) => { return o.innerHTML; }).join("/");
	};

    function addGlobalStyle(css) {
        var head, style;
        head = document.querySelector("head");
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

	/** Main Method */
	document.addEventListener("DOMContentLoaded", () => {
		addGlobalStyle(".import-row { background: #f0f0f0; } .import-row:hover { text-decoration: underline; color: blue; cursor: pointer; } ");
        var imports = getAllImportsAndSetClassName();
		console.log(imports);
    });
})();
