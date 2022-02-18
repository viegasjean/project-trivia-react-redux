import {
  GET_QUESTIONS,
  REQUEST_QUESTIONS,
  FAILED_REQUEST,
  OPTIONS,
} from '../actions/questionsAction';

const INITIAL_STATE = {
  questions: [],
  options: [],
  loading: true,
  error: '',
};

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      loading: true,
    };
  case GET_QUESTIONS:
    console.log(action.type);
    return {
      ...state,
      questions: action.payload,
      loading: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      loading: true,
      erro: action.payload,
    };
  case OPTIONS:
    return {
      ...state,
      options: action.payload,
    };
  default:
    return state;
  }
}

export default questionsReducer;
