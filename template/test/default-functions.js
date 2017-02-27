var chai = require("chai");
var expect = chai.expect;
var df = require("../scripts/_default-functions");
describe('testDefaultFunctions', function () {
    var classUnderTest = df;
    beforeEach(function () {
    });
    it('init_ShouldReturnStringContainsNull', function () {
        var shouldBeStringNull = classUnderTest.init();
        expect(shouldBeStringNull).to.be.equal("null");
    });
    it('calculate_SollteIwasMachen', function () {
        var shouldBeOne = classUnderTest.calculate(2, 1, "-");
        expect(shouldBeOne).to.be.equal(1);
    });
});
