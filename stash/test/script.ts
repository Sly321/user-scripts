import chai = require("chai");
import sinon = require("sinon");

let expect = chai.expect;

import df = require('../scripts/_default-functions');
import sc = require('../scripts/script');

describe('testScripts', () => {

	let classUnderTest = sc;

	// Vor jedem Test
	beforeEach(() => {

	});

	it('init_ShouldReturnStringContainsNull', () => {
		// Vorbereitung
		var callback = sinon.stub().returns(42);
		df.init = callback;

		// Ausführung
		let shouldBeStringNull = classUnderTest.init();

		// Prüfung
		expect(shouldBeStringNull).to.be.equal(42);
	});
});
