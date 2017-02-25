import React from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./components/HelloWorld";

ReactDOM.render(
	<div>
		<h1>Sherlock Holmes</h1>
		<HelloWorld />
		<HelloWorld greetTarget="Batman" />
		<HelloWorld greetTarget="Iron Man" />
		<HelloWorld greetTarget="Nicolas Cage" />
	</div>,
	document.querySelector("#approot")
);
