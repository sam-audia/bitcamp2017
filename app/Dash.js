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
									<input type="text" name="itemname" id="itemname" className="form-control" placeholder="Item" required/>
								</div>
								<div className="form-group">
									<label>Note</label>
									<input type="text" name="tasknote" id="tasknote" className="form-control" placeholder="Note" required/>
								</div>
								<div className="form-group">
									<label>Goal Amount</label>
									<input type="number" name="goalamt" id="goalamt" className="form-control" required/>
								</div>
								<input type="hidden" name="initamt" id="initamt" value="10" />
								<input type="hidden" name="tasks[]" value="" />
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

		this.deleteItem = this.deleteItem.bind(this);
	}

	deleteItem (e) {
		e.preventDefault();
		axios.delete('/users/goals/' + this.props.gid);
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

					<button onClick={this.deleteItem} type="button" className="btn btn-danger btn-large">
						<span className="glyphicon glyphicon-minus" aria-hidden="true">-</span>
					</button>

				</div>
			</div>
		)
	}
}

class SubTask extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="card-footer">
			</div>
		)
	}
}

class SubTaskAdd extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="card-footer">
			<button type="button" className="btn btn-success">
				<span className="glyphicon glyphicon-plus" aria-hidden="true">+</span>
			</button>
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
				<DashItem  key={item._id} gid={item._id} title={item.itemname} subtitle={item.tasknote} goal={item.goalamt} amount={item.initamt}/>
			)}
			<DashAdd />
			</div>
		)
	}
}

export default class Dash extends Component {
	constructor (props) {
		super(props);
		this.state = {items: [], first: '', last: ''};

		this.getItems = this.getItems.bind(this);
		this.getUser = this.getUser.bind(this);
	}

	getItems () {
		axios.get('/users/goals').then((res) => {
			this.setState({items: res.data});
		});
		setInterval(this.getItems, 3000);
	}

	getUser () {
		axios.get('/users/info').then((res) => {
			this.setState({first: res.data.first, last: res.data.last});
		});
	}

	componentDidMount() {
		this.getItems();
		this.getUser();
	}

	render() {
		return (
			<div>
				<h1>Hi {this.state.first} {this.state.last}
				<form action="/logout" method="POST"><button type="sumbit" className="btn btn-danger">Log Out</button></form>
				</h1>
				<DashList items={this.state.items}/>
			</div>
		)
	}
}
