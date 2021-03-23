import React from 'react'

function InfoBox() {
	return (
		<>
			<h2>React Caesar Cipher</h2>
			<h4>By Fillip Serov</h4>
			<p>
				Cipher app written in React. Works with any rotation value, including negative numbers to shift backwards. Keeps track of text that has been ciphered in the history table.
			</p>
			<p>
				Initial app was generated using <code>create-react-app</code>. Unit tests for the character and string shifting are in <code>src/components/App.test.js</code>. There is also a little bit of Bootstrap to make it all look nice 🙂.
			</p>
		</>
	)
}

export default InfoBox;