import React from 'react';
import axios from 'axios';
import Joke from './Joke';
import image from './image.png';
import './JokeList.css';
class JokeList extends React.Component {
	static defaultProps = {
		numJokes: 10
	}

	state = { jokesList: [] };

	async componentDidMount() {
		let jokesList = [];
		while (jokesList.length < this.props.numJokes) {
			let res = await axios.get('https://icanhazdadjoke.com/', {
				headers: {
					Accept: 'application/json'
				}
			})
			jokesList.push({ id: res.data.id, text: res.data.joke, votes: 0 });
		}
		this.setState({ jokesList: jokesList })
	}

	render() {
		return (
			<div className="container">
				<div className="sidebar">
					<h1 className="title">Dad Jokes</h1>
					<img src={image} alt="dad-illustration"/>
					<button className="more-button">Get new jokes</button>
				</div>

				<div className="joke-list">
					{this.state.jokesList.map(joke => (
						<Joke key={joke.id} joke={joke} />
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
