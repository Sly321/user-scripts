import df = require('../scripts/_default-functions');

export function hello2(): void {
	console.log("");
}

export function init(): string {
	var str = df.init();
	df.hello();
	return str;
}
