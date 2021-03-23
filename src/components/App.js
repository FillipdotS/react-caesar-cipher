import React, { Component } from 'react';
import History from "./History";
import InfoBox from './InfoBox';

/**
 * Veeqo Technical Assessment done by Fillip Serov
 */
class App extends Component {
	constructor() {
		super();
	
		this.state = {
			stringToCipher: '',
			rotation: '',
			result: '',
			history: [],
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/**
	 * Shift the given character by the given integer (which can be negative).
	 * @param {string} char 
	 * @param {number} rotation 
	 * @returns {string} Shifted character
	 */
	shiftCharacter(char, rotation) {
		/**
		 * For reference:
		 * A = 65, ..., Z = 90
		 * a = 97, ..., z = 122
		 */

		let charCode = char.charCodeAt(0);
		let isCapital = (charCode > 64 && charCode < 91) ? true : false;

		// If character is not in the letter constraints, just return it unchanged
		if (!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))) {
			return char;
		}

		const ALPHABET_LENGTH = 26;

		/**
		* Work in only one case, as it's much easier to convert back than
		* work with both cases at once.
		*/
		let upperCharCode = char.toUpperCase().charCodeAt(0);
		let alphabeticalIndex = upperCharCode - 65;

		/**
		 * Explanation of algorithm:
		 * Add the rotation to the index and modulo by 26. If it went out of bounds
		 * then the modulo will correct it (i.e. Z (25) shifted by 2 will be 27, 
		 * which is corrected to 1 (B)). Otherwise the modulo has no effect, such as
		 * in: C (2) shifted by 5 will be 7 (H), and 7 % 26 is still 7.
		 * 
		 * This will sometimes work for a negative rotation (7 + (-5) is 2, which
		 * is still correct). However for negative rotations that "loop" back round,
		 * and result in a negative index (A shifted -1 to Z), we need to do an
		 * extra check.
		 * i.e. C (2) shifted by -3 will be -1. 26 + (-1) = 25 (Z)
		 */
		let newIndex = (alphabeticalIndex + rotation) % ALPHABET_LENGTH;
		if (newIndex < 0) {
			newIndex += ALPHABET_LENGTH;
		}

		// Return back to ASCII format
		let newCharCode = newIndex + 65;
		if (!isCapital) {
			newCharCode += 32;
		}

		let newChar = String.fromCharCode(newCharCode);

		return newChar;
	}

	/**
	 * Shifts all alphabetic letters in a string by the rotation given.
	 * @param {string} original 
	 * @param {number} rotation 
	 * @returns {string} Shifted string
	 */
	shiftString(original, rotation) {
		// Avoid string as int problems
		rotation = parseInt(rotation);

		let originalAsCharArray = original.split('');

		let newCharArray = originalAsCharArray.map((char) => {
			return this.shiftCharacter(char, rotation);
		});
		let newString = newCharArray.join('');

		return newString;
	}
	
	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	/**
	 * Called on form submit. Takes the given string and rotation and ciphers it.
	 * Updates the result shown and adds the before/after to the history table.
	 * @param {*} event 
	 */
	handleSubmit(event) {
		event.preventDefault();

		// Form might give a string (or user might write 1.5 etc)
		let rotationAsInt = parseInt(this.state.rotation);

		let cipheredString = this.shiftString(this.state.stringToCipher, rotationAsInt);

		let newHistory = {
			before: this.state.stringToCipher,
			rotation: rotationAsInt,
			after: cipheredString,
		}

		// Update result, and add new history index 0 (so it shows up on top)
		this.setState({
			result: cipheredString,
			history: [newHistory, ...this.state.history],
		});
	}

	render() {
		return (
			<div className="app">
				<InfoBox />
	
				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="Text to cipher"
								name="stringToCipher"
								value={this.state.stringToCipher}
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="col">
							<input
								type="number"
								className="form-control"
								placeholder="Rotation"
								name="rotation"
								value={this.state.rotation}
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="col">
							<button type="submit" className="btn btn-primary">Cipher</button>
						</div>
					</div>
				</form>

				<br />
				{this.state.result &&
					<h5><b>Result:</b> {this.state.result}</h5>
				}

				<hr />

				<History 
					history={this.state.history}
				/>
			</div>
		);
	}
}

export default App;
