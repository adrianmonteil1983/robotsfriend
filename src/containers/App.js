import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../action';

const mapStateToProps = (state, ownprops) => {
	console.log("mapStateToProps");
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch, ownprops) => {
	console.log("mapDispatchToProps");
	return {
		onSearchChange: (event) =>{ console.log("onSearchChange");
			dispatch(setSearchField(event.target.value))},
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component{
	
	/*constructor(){
		super()
		this.state = {
			robots: [],
			//searchfield: '',
		}
	}*/

	componentDidMount(){
		console.log("mount");
		this.props.onRequestRobots();
		/*fetch('https://jsonplaceholder.typicode.com/users')
		.then(response =>  response.json())
	    .then(users => this.setState({robots: users}))*/
	    
	}

	/*onSearchChange = (event) => {
		this.setState({searchfield: event.target.value});
	}*/

	render()
	{
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		});
		
		return isPending ?
			<h1>Loading</h1> :
		(
				<div className='tc'>
					<h1 className='f1'> RobotsFriends</h1>
					<SearchBox searchChange={onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>
				</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
