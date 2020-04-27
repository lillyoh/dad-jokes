import React from 'react';
import axios from 'axios';
import Joke from './Joke';
import image from './image.png';
import './JokeList.css';

class JokeList extends React.Component {
	static defaultProps = {
		numJokes: 6,
	};

	state = {
		jokesList: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
	};

	componentDidMount() {
		if (this.state.jokesList.length === 0) {
			this.getJokes();
		}
	}

	async getJokes() {
		let jokesList = [];
		while (jokesList.length < this.props.numJokes) {
			let res = await axios.get('https://icanhazdadjoke.com/', {
				headers: {
					Accept: 'application/json',
				},
			});
			jokesList.push({ id: res.data.id, text: res.data.joke, votes: 0 });
		}
		this.setState({ jokesList: jokesList });
		window.localStorage.setItem('jokes', JSON.stringify(jokesList));
	}

	handleVote = (jokeId, delta) => {
		this.setState(
			{
				jokesList: this.state.jokesList.map((joke) =>
					joke.id === jokeId ? { ...joke, votes: joke.votes + delta } : joke
				),
			},
			() =>
				window.localStorage.setItem(
					'jokes',
					JSON.stringify(this.state.jokesList)
				)
		);
	};

	handleClick = () => {
		this.getJokes();
	};

	render() {
		return (
			<div className='container'>
				<div className='sidebar'>
					<h1 className='title'>Dad Jokes</h1>
					<img src={image} alt='dad-illustration' />
					<button className='more-button' onClick={this.handleClick}>
						Get new jokes
					</button>
				</div>

				<div className='joke-list'>
					{this.state.jokesList.map((joke) => (
						<Joke key={joke.id} joke={joke} handleVote={this.handleVote} />
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
