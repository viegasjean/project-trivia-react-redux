import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenAction from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  handleInput = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  handleDisabled = () => {
    const { name, email } = this.state;
    console.log('group34');
    return name && email;
  };

  handleRequest = async () => {
    const { sendToken } = this.props;
    const url = 'https://opentdb.com/api_token.php?command=request';
    const reponse = await fetch(url);
    const data = await reponse.json();
    return sendToken(data.token);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('./playgame');
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
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            data-testid="input-gravatar-email"
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
});

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
