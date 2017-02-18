import React from "react";
import ReactDOM from "react-dom";

var HelloWorld = React.createClass({
	render: function() {
		return (
			<p>Hello, {this.props.greetTarget}!</p>
		);
	}
});

ReactDOM.render(
	<div>
		<h1>Sherlock Holmes</h1>
		<HelloWorld greetTarget="Batman" />
		<HelloWorld greetTarget="Iron Man" />
		<HelloWorld greetTarget="Nicolas Cage" />
	</div>,
	document.querySelector("#approot")
);
