"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var expect = chai.expect;
var df = require("../scripts/_default-functions");
describe('testMain', function () {
    var classUnderTest = df;
    // Vor jedem Test
    beforeEach(function () {
    });
    it('init_ShouldReturnStringContainsNull', function () {
        // Vorbereitung
        // Ausführung
        var shouldBeStringNull = classUnderTest.init();
        // Prüfung
        expect(shouldBeStringNull).to.be.equal("null");
    });
    it('calculate_SollteIwasMachen', function () {
        // Vorbereitung
        // Ausführung
        var shouldBeOne = classUnderTest.calculate(2, 1, "-");
        // Prüfung
        expect(shouldBeOne).to.be.equal(1);
    });
});
