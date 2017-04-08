import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './Login.js';
import Home from './Home.js';
import Dash from './Dash.js';
import NoMatch from './404.js';

export default class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/app/login' component={Login} />
					<Route path='/app/user/:id' component={Dash}/>
					<Route component={NoMatch} />
				</Switch>
			</Router>
		);
	}
}
