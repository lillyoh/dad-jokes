import React from 'react';

class Joke extends React.Component {


  render() {
    const { joke } = this.props;
    console.log(this.props);

    return (
      <div className="joke">
        <div className="joke-buttons">
          <i className="fas fa-arrow-circle-up"></i>
          <span>{joke.votes}</span>
        </div>
        <div className="joke-content">
          {joke.text}
        </div>
      </div>
    );
  }
}

export default Joke;
