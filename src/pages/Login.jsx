import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playerAction, tokenAction } from '../redux/actions';
import { fetchToken } from '../servicesAPI/servicesAPI';
import fetchQuestionsAction from '../redux/actions/questionsAction';
// import { fetchToken } from '../servicesAPI/servicesAPI';

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

  handleSubmit = () => {
    const { infoPlayer, sendToken, history } = this.props;
    infoPlayer(this.state);
    fetchToken().then((token) => sendToken(token));
    history.push('./playgame');
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
  getQuestions: (token) => dispatch(fetchQuestionsAction(token)),
  infoPlayer: (info) => dispatch(playerAction(info)),
});

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
