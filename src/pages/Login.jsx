import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenAction, { playerAction } from '../redux/actions';
import { fetchToken } from '../servicesAPI/servicesAPI';

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
    const data = await fetchToken();
    localStorage.setItem('token', data.token);
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
    const { history } = this.props;
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  infoPlayer: PropTypes.func.isRequired,
  sendToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendToken: (token) => dispatch(tokenAction(token)),
  infoPlayer: (info) => dispatch(playerAction(info)),
});

export default connect(null, mapDispatchToProps)(Login);
