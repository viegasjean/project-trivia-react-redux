import { fetchQuestions } from '../../servicesAPI/servicesAPI';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const FAILED_REQUEST = 'FAILED_REQUEST';

function requestQuestions() {
  return { type: REQUEST_QUESTIONS };
}
function getQuestions(data) {
  return { type: GET_QUESTIONS, payload: data };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

function fetchQuestionsAction(token) {
  return async (dispatch) => {
    dispatch(requestQuestions());
    try {
      const data = await fetchQuestions(token);
      dispatch(getQuestions(data));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export default fetchQuestionsAction;
