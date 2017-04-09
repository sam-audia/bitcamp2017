import React, { Component } from 'react';

class DashAdd extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (

		);
	}
}

class DashItem extends Component {
	constructor (props) {
		super(props);
	}

	render() {
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
								<span style={{width: "25%"}}>$34</span>
							</div>
						</div>
					</div>
					<p>{this.props.goal}</p>
				</div>
				{this.props.tasks.map((task) =>
					<div key={task.tid} className="card-footer text-muted">
						<h6>{task.name}</h6>
						<h8>{task.goal}</h8>
					</div>
				)}
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
				<DashItem key={item.id} title={item.title} subtitle={item.subtitle} goal={item.goal} tasks={item.tasks} />
			)}
			</div>
		)
	}
}

export default class Dash extends Component {
	constructor (props) {
		super(props);
		this.items = [
			{
				'id': 1,
				'title': 'Task 1',
				'subtitle': 'Sample Text',
				'goal': 100,
				'tasks': [{'tid': 1, 'name':"weightloss", 'goal': 175}, {'tid': 2, 'name':"weightloss", 'goal': 175}]
			},
			{
				'id': 2,
				'title': 'Task 2',
				'subtitle': 'Sample Text',
				'goal': 50,
				'tasks': [{'tid': 1, 'name':"weightloss", 'goal': 150}]
			}
		];
	}

	render() {
		return (
			<div>
				<h1>Hi</h1>
				<DashList items={this.items}/>
			</div>
		)
	}
}
