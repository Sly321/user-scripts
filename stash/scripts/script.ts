'use strict';

let getLinkFromImportElement, openUrlInNewTab, getHtmlLink,
	replaceJavaWithHtml, buildDocLink, getJavaxDocLink,
	getJavaxAnnotationDocLink, getJavaUtilDocLink, getJavaIoDocLink,
	getJavaBeanDocLink, handleSchultraegerportal, handleEudSchule,
	handleThirdpartyImport, navigateTo, getAllImportsAndSetClassName,
	getSpringDocLink;

const JAVA_ORACLE_API = "https://docs.oracle.com/javaee/7/api/";
const JAVA_ORACLE_DOCS = "https://docs.oracle.com/javase/7/docs/api/";
const SPRING_DOC = "http://docs.spring.io/spring-framework/docs/2.5.x/api/";

function isSrcImport(link) {
	var scag = /senbjw|isbj|eud|schule|verwalt_berlin/g;
	var java = /javax.faces|java.util|javax.annotation|java.io|java.beans|org.springframework/g;
	if (link.match(scag) || link.match(java)) {
		return true;
	} else {
		return false;
	}
}

navigateTo = (javaLink) => {
	javaLink += ".java";
	var originalPath = window.location.pathname.split("/");
	var projectName = originalPath[4];

	switch (projectName) {
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

	if (sourceLink.match(false)) {
	} else if (sourceLink.match(eudSchuleServiceRegex)) {
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

	var stpSharedSchuleRegex = /stp\/shared\/schule/g;
	var eudSchuleWebappRegex = /schule\/web\/controller|schule\/web\/converter|schule\/web\/filter|schule\/web\/job|schule\/web\/servlet|schule\/web\/table|schule\/web\/user|schule\/web\/validator/g;
	var eudSchuleModelRegex = /schule\/converter\/|schule\/dto\/|schule\/enums\/|schule\/model\/|schule\/shared\/|schule\/util\//g;
	var eudSchuleServiceRegex = /schule\/service\//g;

	if (sourceLink.match(stpSharedSchuleRegex)) {
		console.log("stp-shared-schule link");
		rootPath[4] = "stp-shared-schule";
		rootPath.splice(6, 1);
	} else if (sourceLink.match(eudSchuleWebappRegex)) {
		console.log("webapp link");
		rootPath[6] = "eud-schule-webapp";
	} else if (sourceLink.match(eudSchuleModelRegex)) {
		console.log("model link");
		rootPath[6] = "eud-schule-model";
	} else if (sourceLink.match(eudSchuleServiceRegex)) {
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
	var javax = /javax\/faces\//g;
	var javaxAnnotation = /javax\/annotation\//g;
	var javau = /java\/util\//g;
	var javaio = /java\/io\//g;
	var javabeans = /java\/beans\//g;
	var spring = /org\/springframework\//g;

	var url = "https://www.google.de/search?q=";

	// javax.faces.*
	if (sourceFileLink.match(javax)) {
		url = getJavaxDocLink(sourceFileLink);

		// java.util.*
	} else if (sourceFileLink.match(javau)) {
		url = getJavaUtilDocLink(sourceFileLink);

		// javax.annotation.*
	} else if (sourceFileLink.match(javaxAnnotation)) {
		url = getJavaxAnnotationDocLink(sourceFileLink);

		// java.io.*
	} else if (sourceFileLink.match(javaio)) {
		url = getJavaIoDocLink(sourceFileLink);

		// java.beans.*
	} else if (sourceFileLink.match(javabeans)) {
		url = getJavaBeanDocLink(sourceFileLink);

		// org.spring.*
	} else if (sourceFileLink.match(spring)) {
		url = getSpringDocLink(sourceFileLink);

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
	return buildDocLink(JAVA_ORACLE_API, javaLink, 3);
};

getJavaxAnnotationDocLink = function(javaLink) {
	return buildDocLink(JAVA_ORACLE_API, javaLink, 2);
};

getJavaUtilDocLink = function(javaLink) {
	return buildDocLink(JAVA_ORACLE_DOCS, javaLink, 2);
};

getJavaIoDocLink = function(javaLink) {
	return buildDocLink(JAVA_ORACLE_DOCS, javaLink, 2);
};

getJavaBeanDocLink = function(javaLink) {
	return buildDocLink(JAVA_ORACLE_DOCS, javaLink, 2);
};

getSpringDocLink = function(javaLink) {
	return buildDocLink(SPRING_DOC, javaLink);
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
	if (slice === undefined)
		slice = str.length - 1;
	return `${str.slice(0, slice).join("/")}/${str.slice(slice, str.length).join(".")}`;
};

openUrlInNewTab = function(url) {
	var win = window.open(url, '_blank');
	win.focus();
	return true;
};

/**
 * Should be obvious what this method does, if you taek a quick look at
 * the code.
 */
getAllImportsAndSetClassName = () => {
	let keywordArray = document.querySelectorAll(".cm-keyword");
	return Array.prototype.filter.call(keywordArray, o => {
		let importArray = getLinkFromImportElement(o.parentElement);
		if (o.innerHTML === "import" && isSrcImport(importArray)) {
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
getLinkFromImportElement = (element) => {
	if (element.querySelector(".cm-variable") === null) {
		element = element.parentElement;
	}
	return Array.prototype.map.call(element.querySelectorAll(".cm-variable"), (o) => {
		return o.innerHTML;
	}).join("/");
};

/** Main Method */
$(document).ready(() => {
	var imports = getAllImportsAndSetClassName();
});
