import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


export default class Home extends Component {
	render() {
		return (
			<Link to='/login'>Login</Link>
		)
	}
}