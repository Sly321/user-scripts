var chai = require("chai");
var sinon = require("sinon");
var expect = chai.expect;
var df = require("../scripts/_default-functions");
var sc = require("../scripts/script");
describe('testScripts', function () {
    var classUnderTest = sc;
    beforeEach(function () {
    });
    it('init_ShouldReturnStringContainsNull', function () {
        var callback = sinon.stub().returns(42);
        df.init = callback;
        var shouldBeStringNull = classUnderTest.init();
        expect(shouldBeStringNull).to.be.equal(42);
    });
});
