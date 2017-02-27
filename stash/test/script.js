"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var sinon = require("sinon");
var expect = chai.expect;
var df = require("../scripts/_default-functions");
var sc = require("../scripts/script");
describe('testScripts', function () {
    var classUnderTest = sc;
    // Vor jedem Test
    beforeEach(function () {
    });
    it('init_ShouldReturnStringContainsNull', function () {
        // Vorbereitung
        var callback = sinon.stub().returns(42);
        df.init = callback;
        // Ausführung
        var shouldBeStringNull = classUnderTest.init();
        // Prüfung
        expect(shouldBeStringNull).to.be.equal(42);
    });
});
