/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/HelloWorld';

require('./css/main.css');

ReactDOM.render(
	<div>
		<h1>React development environment</h1>
		<HelloWorld />
		<HelloWorld greetTarget="Batman" />
		<HelloWorld greetTarget="Iron Man" />
		<HelloWorld greetTarget="Nicolas Cage" />
	</div>,
	document.querySelector("#approot")
);
