import React from 'react';
import axios from 'axios';
import Joke from './Joke';
import image from './image.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import './JokeList.css';

class JokeList extends React.Component {
	static defaultProps = {
		numJokes: 6,
	};

	state = {
		jokesList: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
		loading: false,
	};

	componentDidMount() {
		if (this.state.jokesList.length === 0) {
			this.getJokes();
		}
		console.log('state', this.state);
	}

	async getJokes() {
		let jokesList = [];
		while (jokesList.length < this.props.numJokes) {
			let res = await axios.get('https://icanhazdadjoke.com/', {
				headers: {
					Accept: 'application/json',
				},
			});
			jokesList.push({
				id: res.data.id,
				text: res.data.joke,
				votes: 0,
			});
		}
		this.setState(
			{
				jokesList: [...this.state.jokesList, ...jokesList],
				loading: false,
			},
			() =>
				window.localStorage.setItem(
					'jokes',
					JSON.stringify(this.state.jokesList)
				)
		);
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
		this.setState({ loading: true }, this.getJokes);
	};

	render() {
		if (this.state.loading) {
			return (
				<div className='spinner'>
					<CircularProgress />
				</div>
			);
		}
		return (
			<div className='container'>
				<div className='sidebar'>
					<h1 className='title'>Dad Jokes</h1>
					<img src={image} alt='dad-illustration' />
					<button className='more-button' onClick={this.handleClick}>
						Add more jokes
					</button>
					<button className='more-button' onClick={this.handleClearClick}>
						Clear settings
					</button>
				</div>

				<div className='content-container'>
					<div className='joke-list'>
						{this.state.jokesList.map((joke) => (
							<Joke key={joke.id} joke={joke} handleVote={this.handleVote} />
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default JokeList;
