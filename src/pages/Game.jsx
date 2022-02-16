import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameMain from '../components/GameMain';

class Game extends Component {
  render() {
    return (
      <GameMain />
    );
  }
}

export default Game;
