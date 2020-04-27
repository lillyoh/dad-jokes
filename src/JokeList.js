import React from 'react';
import axios from 'axios';

class JokeList extends React.Component {
	static defaultProps = {
		numJokes: 10
	}

	state = { jokes: [] };

	async componentDidMount() {
		let jokesList = [];
		while (jokesList.length < this.props.numJokes) {
			let res = await axios.get('https://icanhazdadjoke.com/', {
				headers: {
					Accept: 'application/json'
				}
			})
			jokesList.push(res.data.joke);
		}
		this.setState({ jokes: jokesList })
	}

	render() {
		return (
			<div className="container">
				<h1>Joke List</h1>
				<div className="jokes-list">
					{this.state.jokes.map(j => (
						<div>{j}</div>
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
