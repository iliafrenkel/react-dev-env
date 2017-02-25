import React from "react";

/**
 * An absloutely awesome, state of the art HelloWold component!
 * Take your time studying it, but don't take too much. Then go
 * and buy yourself a beer or a doughnut. Whatever tickles your
 * fancy.
 */
class HelloWorld extends React.Component {
	render() {
		return (
			<p>Hello, {this.props.greetTarget}!</p>
		);
	}
}

HelloWorld.propTypes = {
	/**
	 * A name of a person, a place or just the whole world.
	 * Be carefull though, whatever you name here will be greated with
	 * utmost power and a lot of excitement.
	 * @type {string}
	 */
	greetTarget: React.PropTypes.string.isRequired,
}

HelloWorld.defaultProps = {
	greetTarget: 'World'
}

module.exports = HelloWorld
