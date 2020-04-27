import React from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './Joke.css';

class Joke extends React.Component {
	render() {
		const { joke, handleVote } = this.props;

		return (
			<div className='joke'>
				<div className='joke-content'>{joke.text}</div>
				<div className='joke-buttons'>
					<ArrowDropUpIcon
						className='icon'
						onClick={() => handleVote(joke.id, 1)}
					/>
					<span className='joke-votes'>{joke.votes}</span>
					<ArrowDropDownIcon
						className='icon'
						onClick={() => handleVote(joke.id, -1)}
					/>
				</div>
			</div>
		);
	}
}

export default Joke;
