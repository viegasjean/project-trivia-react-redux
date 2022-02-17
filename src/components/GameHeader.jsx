import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class GameHeader extends Component {
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
    const { name, score } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="minha foto"
        />
        <h5 data-testid="header-player-name">{name}</h5>
        <h5 data-testid="header-score">{score}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,

});

GameHeader.propTypes = {
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(GameHeader);
