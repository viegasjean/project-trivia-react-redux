import React, { Component } from 'react';
// import { connect } from 'react-redux';
import GameMain from '../components/GameMain';
import GameHeader from '../components/GameHeader';

class Game extends Component {
  render() {
    return (
      <section>
        <GameHeader />
        <GameMain />
      </section>
    );
  }
}

export default Game;
