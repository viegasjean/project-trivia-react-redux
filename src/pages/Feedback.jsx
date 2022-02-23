import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameHeader from '../components/GameHeader';
import { addToRanking } from '../servicesAPI/ranking';

class Feedback extends Component {
  componentDidMount() {
    this.saveToRanking();
  }

  saveToRanking() {
    const { name, score } = this.props;
    addToRanking(name, score);
  }

  render() {
    const THRE = 3;
    const { hits, score, history } = this.props;
    return (
      <>
        <GameHeader />
        <h1 data-testid="feedback-text">
          { (hits < THRE) ? 'Could be better...' : 'Well Done!' }
        </h1>

        <h2 data-testid="feedback-total-score">{ score }</h2>
        <h2 data-testid="feedback-total-question">{ hits }</h2>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
}.isRequired;

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  hits: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
