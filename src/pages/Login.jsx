import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenAction, { playerAction } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
    };
  }

  handleInput = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  handleDisabled = () => {
    const { name, gravatarEmail } = this.state;
    return name && gravatarEmail;
  };

  handleRequest = async () => {
    const { sendToken } = this.props;
    const url = 'https://opentdb.com/api_token.php?command=request';
    const reponse = await fetch(url);
    const data = await reponse.json();
    localStorage.setItem('teken', data.token);
    return sendToken(data.token);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, infoPlayer } = this.props;
    history.push('./playgame');
    infoPlayer(this.state);
    this.handleRequest();
  };

  render() {
    return (
      <form>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            data-testid="input-player-name"
            placeholder="NOME"
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="gravatarEmail">
          <input
            type="text"
            id="gravatarEmail"
            data-testid="input-gravatar-email"
            placeholder="EMAIL"
            onChange={ this.handleInput }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !this.handleDisabled() }
          onClick={ this.handleSubmit }
        >
          Play
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendToken: (token) => dispatch(tokenAction(token)),
  infoPlayer: (info) => dispatch(playerAction(info)),
});

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
