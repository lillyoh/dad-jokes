import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

class Joke extends React.Component {
	render() {
		const { joke, handleVote } = this.props;

		return (
			<div className='joke'>
				<div className='joke-buttons'>
					<ThumbUpIcon onClick={() => handleVote(joke.id, 1)} />
					<span>{joke.votes} Votes</span>
					<ThumbDownIcon onClick={() => handleVote(joke.id, -1)} />
				</div>
				<div className='joke-content'>{joke.text}</div>
			</div>
		);
	}
}

export default Joke;
