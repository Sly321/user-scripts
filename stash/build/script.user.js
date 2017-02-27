// ==UserScript==
// @name         Stash Linker
// @namespace    https://github.com/Sly321/
// @version      0.2.6
// @description  You can click on import links to go the file.
// @author       Sven Liebig
// @match        http://stash.schuetze.infra/projects/*.java
// @require		 https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/Sly321/user-scripts/master/stash/build/min.user.js
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.querySelector("head");
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
$(document).ready(function () {
    addGlobalStyle(".import-row { background: #f0f0f0; } .import-row:hover { text-decoration: underline; color: blue; cursor: pointer; } ");
});

Object.defineProperty(exports, "__esModule", { value: true });
var getLinkFromImportElement, openUrlInNewTab, getHtmlLink, replaceJavaWithHtml, buildDocLink, getJavaxDocLink, getJavaxAnnotationDocLink, getJavaUtilDocLink, getJavaIoDocLink, getJavaBeanDocLink, handleSchultraegerportal, handleEudSchule, handleThirdpartyImport, navigateTo, getAllImportsAndSetClassName, getSpringDocLink;
var JAVA_ORACLE_API = "https://docs.oracle.com/javaee/7/api/";
var JAVA_ORACLE_DOCS = "https://docs.oracle.com/javase/7/docs/api/";
var SPRING_DOC = "http://docs.spring.io/spring-framework/docs/2.5.x/api/";
function isSrcImport(link) {
    var scag = /senbjw|isbj|eud|schule|verwalt_berlin/g;
    var java = /javax.faces|java.util|javax.annotation|java.io|java.beans|org.springframework/g;
    if (link.match(scag) || link.match(java)) {
        return true;
    }
    else {
        return false;
    }
}
exports.isSrcImport = isSrcImport;
navigateTo = function (javaLink) {
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
handleSchultraegerportal = function (rootPath, sourceLink) {
    var eudSchuleServiceRegex = /schule\/service\//g;
    if (sourceLink.match(false)) {
    }
    else if (sourceLink.match(eudSchuleServiceRegex)) {
        console.log("schultraegerportal-services");
        rootPath[6] = "schultraegerportal-services";
    }
    else {
        return handleThirdpartyImport(sourceLink);
    }
    var subPath = rootPath.slice(0, rootPath.indexOf("java") + 1);
    window.location.pathname = subPath.join("/") + "/" + sourceLink;
    return true;
};
handleEudSchule = function (rootPath, sourceLink) {
    var stpSharedSchuleRegex = /stp\/shared\/schule/g;
    var eudSchuleWebappRegex = /schule\/web\/controller|schule\/web\/converter|schule\/web\/filter|schule\/web\/job|schule\/web\/servlet|schule\/web\/table|schule\/web\/user|schule\/web\/validator/g;
    var eudSchuleModelRegex = /schule\/converter\/|schule\/dto\/|schule\/enums\/|schule\/model\/|schule\/shared\/|schule\/util\//g;
    var eudSchuleServiceRegex = /schule\/service\//g;
    if (sourceLink.match(stpSharedSchuleRegex)) {
        console.log("stp-shared-schule link");
        rootPath[4] = "stp-shared-schule";
        rootPath.splice(6, 1);
    }
    else if (sourceLink.match(eudSchuleWebappRegex)) {
        console.log("webapp link");
        rootPath[6] = "eud-schule-webapp";
    }
    else if (sourceLink.match(eudSchuleModelRegex)) {
        console.log("model link");
        rootPath[6] = "eud-schule-model";
    }
    else if (sourceLink.match(eudSchuleServiceRegex)) {
        console.log("eud-schule-services");
        rootPath[6] = "eud-schule-services";
    }
    else {
        return handleThirdpartyImport(sourceLink);
    }
    var subPath = rootPath.slice(0, rootPath.indexOf("java") + 1);
    window.location.pathname = subPath.join("/") + "/" + sourceLink;
    return true;
};
handleThirdpartyImport = function (sourceFileLink) {
    var javax = /javax\/faces\//g;
    var javaxAnnotation = /javax\/annotation\//g;
    var javau = /java\/util\//g;
    var javaio = /java\/io\//g;
    var javabeans = /java\/beans\//g;
    var spring = /org\/springframework\//g;
    var url = "https://www.google.de/search?q=";
    if (sourceFileLink.match(javax)) {
        url = getJavaxDocLink(sourceFileLink);
    }
    else if (sourceFileLink.match(javau)) {
        url = getJavaUtilDocLink(sourceFileLink);
    }
    else if (sourceFileLink.match(javaxAnnotation)) {
        url = getJavaxAnnotationDocLink(sourceFileLink);
    }
    else if (sourceFileLink.match(javaio)) {
        url = getJavaIoDocLink(sourceFileLink);
    }
    else if (sourceFileLink.match(javabeans)) {
        url = getJavaBeanDocLink(sourceFileLink);
    }
    else if (sourceFileLink.match(spring)) {
        url = getSpringDocLink(sourceFileLink);
    }
    else {
        url += sourceFileLink;
    }
    return openUrlInNewTab(url);
};
getJavaxDocLink = function (javaLink) {
    return buildDocLink(JAVA_ORACLE_API, javaLink, 3);
};
getJavaxAnnotationDocLink = function (javaLink) {
    return buildDocLink(JAVA_ORACLE_API, javaLink, 2);
};
getJavaUtilDocLink = function (javaLink) {
    return buildDocLink(JAVA_ORACLE_DOCS, javaLink, 2);
};
getJavaIoDocLink = function (javaLink) {
    return buildDocLink(JAVA_ORACLE_DOCS, javaLink, 2);
};
getJavaBeanDocLink = function (javaLink) {
    return buildDocLink(JAVA_ORACLE_DOCS, javaLink, 2);
};
getSpringDocLink = function (javaLink) {
    return buildDocLink(SPRING_DOC, javaLink);
};
buildDocLink = function (docUrl, fileUrl, slice) {
    return docUrl + getHtmlLink(replaceJavaWithHtml(fileUrl), slice);
};
replaceJavaWithHtml = function (link) {
    link = link.split("/");
    var length = link.length - 1;
    link[length] = link[length].replace(".java", ".html");
    return link;
};
getHtmlLink = function (str, slice) {
    if (slice === undefined)
        slice = str.length - 1;
    return str.slice(0, slice).join("/") + "/" + str.slice(slice, str.length).join(".");
};
openUrlInNewTab = function (url) {
    var win = window.open(url, '_blank');
    win.focus();
    return true;
};
getAllImportsAndSetClassName = function () {
    var keywordArray = document.querySelectorAll(".cm-keyword");
    return Array.prototype.filter.call(keywordArray, function (o) {
        var importArray = getLinkFromImportElement(o.parentElement);
        if (o.innerHTML === "import" && isSrcImport(importArray)) {
            return o;
        }
    }).map(function (o) {
        o.parentElement.classList.add("import-row");
        o.parentElement.onclick = function (e) {
            navigateTo(getLinkFromImportElement(e.target));
        };
        return o.parentElement;
    });
};
getLinkFromImportElement = function (element) {
    if (element.querySelector(".cm-variable") === null) {
        element = element.parentElement;
    }
    return Array.prototype.map.call(element.querySelectorAll(".cm-variable"), function (o) {
        return o.innerHTML;
    }).join("/");
};
$(document).ready(function () {
    var imports = getAllImportsAndSetClassName();
});
