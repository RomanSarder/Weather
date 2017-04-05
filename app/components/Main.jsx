const React = require('react');
const Nav = require('Nav');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

const Main = (props) => {
	return (
		<div>
			<Nav />
			{props.children}
		</div>
		);
}

module.exports = Main;