const React = require('react');
const ReactDOM = require('react-dom');
const {Route, Router, IndexRoute, hashHistory, IndexRedirect} = require('react-router');
const Main = require('Main');
const Weather = require('Weather');

//Load Styles
require('icons');
require('wind');
require('applicationStyles');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<Route path="weather" component={Weather}/>
			<IndexRedirect to="weather" query={{ location: 'Kiev' }} />
		</Route>
	</Router>,
	document.getElementById('app')
);
