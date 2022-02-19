import {
  GET_QUESTIONS,
  REQUEST_QUESTIONS,
  FAILED_REQUEST,
} from '../actions/questionsAction';

const INITIAL_STATE = {
  questions: [],
  responseCode: 'aaaa',
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
    console.log('red', action.payload);
    return {
      ...state,
      questions: action.payload.results,
      responseCode: action.payload.response_code,
      loading: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      loading: true,
      erro: action.payload,
    };
  default:
    return state;
  }
}

export default questionsReducer;
