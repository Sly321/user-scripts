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
