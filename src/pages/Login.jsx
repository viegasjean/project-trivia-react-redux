import React, { Component } from 'react';

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
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={() => history.push('/settings')}
        >
          Settings
        </button>
      </form>
    );
  }
}

export default Login;
