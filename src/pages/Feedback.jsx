import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      hash: '',
    };
  }

  componentDidMount() {
    this.handleEncription();
  }

  handleEncription = () => {
    const { gravatarEmail } = this.props;
    const generateHash = md5(gravatarEmail).toString();
    this.setState({ hash: generateHash });
  };

  render() {
    const { hash } = this.state;
    const { name, score, hits, history } = this.props;
    const THRE = 3;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="minha foto"
        />
        <h5 data-testid="header-player-name">Name: { name }</h5>
        <h5 data-testid="header-score">Score: { score }</h5>
        <h1 data-testid="feedback-text">
          { (hits < THRE) ? 'Could be better...' : 'Well Done!' }
        </h1>

        <div data-testid="feedback-total-score">Score? : { score }</div>
        <div data-testid="feedback-total-question">Hits: { hits }</div>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  gravatarEmail: player.gravatarEmail,
  name: player.name,
  score: player.score,
  hits: player.assertions,
});

Feedback.propTypes = {
  gravatarEmail: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
