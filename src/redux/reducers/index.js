import { combineReducers } from 'redux';
import token from './reducerToken';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  token,
  questionsReducer,
});

export default rootReducer;
