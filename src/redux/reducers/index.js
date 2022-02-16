import { combineReducers } from 'redux';
import token from './reducerToken';
import questionsReducer from './questionsReducer';
import player from './playerReducer';

const rootReducer = combineReducers({
  token,
  questionsReducer,
  player,
});

export default rootReducer;
