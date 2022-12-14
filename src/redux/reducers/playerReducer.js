import { PLAYER_DATA } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case PLAYER_DATA:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default player;
