import React, { Component } from 'react';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {first: '', last: '', ccNum: '', cvv: ''}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit (e) {
		e.preventDefault();
		this.props.history.push('./user/123');
	}

	render() {
		return(
			<Form handleSubmit={this.handleSubmit} />
		);
	}
}

const Form = (props) => {
	return (
		<div className="container">
			<form onSubmit={props.handleSubmit}>
					<div className="form-group row">
						<div className="col-sm-6">
							<input type="text" className="form-control" placeholder="First" />
						</div>
						<div className="col-sm-6">
							<input type="text" className="form-control" placeholder="Last" />
						</div>
					</div>

					<div className="form-group row">
						<div className="col-sm-8">
							<input type="number" className="form-control" placeholder="Credit Card" />
						</div>
						<div className="col-sm-4">
							<input type="number" className="form-control" placeholder="CVV" />
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}

export default Login;
