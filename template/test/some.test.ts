import chai = require("chai");
let expect = chai.expect;

import Main = require('../scripts/main');

describe('testMain', () => {

	let classUnderTest = Main;

	// Vor jedem Test
	beforeEach(() => {

	});

	it('init_ShouldReturnStringContainsNull', () => {
		// Vorbereitung

		// Ausführung
		let shouldBeStringNull = classUnderTest.init();

		// Prüfung
		expect(shouldBeStringNull).to.be.equal("null");
	});

	it('calculate_SollteIwasMachen', () => {
		// Vorbereitung

		// Ausführung
		var shouldBeOne = classUnderTest.calculate(2, 1, "-");

		// Prüfung
		expect(shouldBeOne).to.be.equal(1);
	});
});
