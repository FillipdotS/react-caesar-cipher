import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});

describe('correct character shifts', () => {
	const app = new App();

	test('should not shift non-alphabetic', () => {
		expect(app.shiftCharacter('!', 5)).toEqual('!');
		expect(app.shiftCharacter(',', -11)).toEqual(',');
	});

	test('should shift letters correctly', () => {
		expect(app.shiftCharacter('H', 13)).toEqual('U');
		expect(app.shiftCharacter('A', -1)).toEqual('Z');
		expect(app.shiftCharacter('z', 1)).toEqual('a');
		expect(app.shiftCharacter('z', -26)).toEqual('z');
		expect(app.shiftCharacter('c', 2)).toEqual('e');
	});
});

test('should shift strings correctly', () => {
	const app = new App();

	expect(app.shiftString("Hello World", 13)).toEqual('Uryyb Jbeyq');
	expect(app.shiftString("The Number 16.", 13)).toEqual('Gur Ahzore 16.');
	expect(app.shiftString("Hello World!", 19)).toEqual('Axeeh Phkew!');
	expect(app.shiftString("abcABC", -1)).toEqual('zabZAB');
});