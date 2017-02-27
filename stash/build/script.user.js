// ==UserScript==
// @name         Userscript
// @namespace    https://github.com/Sly321/
// @version      0.1
// @description  Description.
// @author       Sven Liebig
// @match        http://google.de/*
// @require		 https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/Sly321/user-scripts/master/template/scripts/user-script.js
// ==/UserScript==

Object.defineProperty(exports, "__esModule", { value: true });
var df = require("../scripts/_default-functions");
function hello2() {
    console.log("");
}
exports.hello2 = hello2;
function init() {
    var str = df.init();
    df.hello();
    return str;
}
exports.init = init;

Object.defineProperty(exports, "__esModule", { value: true });
function init() {
    return "null";
}
exports.init = init;
function calculate(firstNum, secondNum, operation) {
    return 1;
}
exports.calculate = calculate;
function hello() {
    console.log("");
}
exports.hello = hello;
function test() {
    ;
}
exports.test = test;
