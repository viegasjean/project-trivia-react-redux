import { TOKEN_PLAYER } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_PLAYER:
    return action.payload;
  default:
    return state;
  }
};

export default token;
