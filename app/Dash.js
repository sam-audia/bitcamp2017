import React, { Component } from 'react';
var axios = require('axios');

class DashAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {editing: false};

		this.toggleEdit = this.toggleEdit.bind(this);
	}

	toggleEdit (e) {
		e.preventDefault();
		this.setState(prevState => ({
      editing: !prevState.editing
    }));
	}

	render() {
		return (
			<div>
				{this.state.editing &&
					<div className="card">
						<div className="card-block">
							<form action="/users/goals" method="post">
								<div className="form-group">
									<label>Goal Item</label>
									<input type="text" name="itemname" id="itemname" className="form-control" placeholder="Item" />
								</div>
								<div className="form-group">
									<label>Note</label>
									<input type="text" name="tasknote" id="tasknote" className="form-control" placeholder="Note" />
								</div>
								<div className="form-group">
									<label>Goal Amount</label>
									<input type="number" name="goalamt" id="goalamt" className="form-control" />
								</div>
								<input type="hidden" name="initamt" id="initamt" value="0" />
								<button type="submit" style={{marginRight: "10px"}} className="btn btn-success btn-large">
				  				<span className="glyphicon glyphicon-plus" aria-hidden="true">+</span>
								</button>
								<button onClick={this.toggleEdit} type="button" className="btn btn-danger btn-large">
									<span className="glyphicon glyphicon-minus" aria-hidden="true">-</span>
								</button>

							</form>

						</div>
					</div>
				}
				{!this.state.editing &&
					<button onClick={this.toggleEdit} type="button" className="btn btn-success btn-large">
	  				<span className="glyphicon glyphicon-plus" aria-hidden="true">+</span>
					</button>
				}
			</div>
		)
	}
}

class DashItem extends Component {
	constructor (props) {
		super(props);
	}

	render() {
		var ratio = parseInt(this.props.amount)/parseInt(this.props.goal)*100;
		var filled = ratio.toString().concat("%");
		return (
			<div className="card">
				<div className="card-block">
					<h4 className="card-title">{this.props.title}</h4>

					<div className="row">
						<div className="col-sm-4">
							<h6 className="card-subtitle mb-2 text-muted">{this.props.subtitle}</h6>
						</div>
						<div className="col-sm-8">
							<div className="meter">
								<span style={{width: filled}}>${this.props.amount}</span>
							</div>
						</div>
					</div>
					<p>${this.props.goal}</p>
				</div>
			</div>
		)
	}
}

class DashList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
			{this.props.items.map((item) =>
				<DashItem key={item._id} title={item.itemname} subtitle={item.tasknote} goal={item.goalamt} amount={item.initamt} />
			)}
			<DashAdd />
			</div>
		)
	}
}

export default class Dash extends Component {
	constructor (props) {
		super(props);
		this.state = {items: []};

		this.getItems = this.getItems.bind(this);

	}

	getItems () {
		axios.get('/users/goals').then((res) => {
			this.setState({items: res.data});
		});
	}

	componentDidMount() {
		this.getItems();
	}

	render() {
		return (
			<div>
				<h1>Hi</h1>
				<DashList items={this.state.items}/>
			</div>
		)
	}
}
