import { fetchQuestions, fetchToken } from '../../servicesAPI/servicesAPI';
import tokenAction from './index';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const OPTIONS = 'OPTIONS';

function requestQuestions() {
  return { type: REQUEST_QUESTIONS };
}

export function getQuestions(data) {
  return { type: GET_QUESTIONS, payload: data };
}

// function failedRequest(error) {
//   return { type: 'FAILED_REQUEST', payload: error };
// }

const actionOptions = (payload) => ({
  type: OPTIONS,
  payload,
});

const handleOptions = (questions) => {
  const MAGIC_NUMBER = 0.5;
  const arrOptions = [questions[0].correct_answer, ...questions[0].incorrect_answers];
  const shuffleOptions = arrOptions.sort(() => Math.random() - MAGIC_NUMBER);
  return (shuffleOptions);
};

const fetchQuestionsAction = () => async (dispatch) => {
  dispatch(requestQuestions());
  let token = localStorage.getItem('token');
  let opt = [];
  if (token === null || token === undefined) {
    const dataToken = await fetchToken();
    localStorage.setItem('token', dataToken.token);
    dispatch(tokenAction(dataToken.token));
    token = dataToken.token;
  }
  let allQuestions = await fetchQuestions(token);
  if (allQuestions.response_code === 3) {
    const dataToken = await fetchToken();
    localStorage.setItem('token', dataToken.token);
    dispatch(tokenAction(dataToken.token));
    token = dataToken.token;
    allQuestions = await fetchQuestions(token);
    opt = handleOptions(allQuestions.results);
    // dispatch(actionOptions(opt));
    // return dispatch(getQuestions(allQuestions.results));
  }
  opt = handleOptions(allQuestions.results);
  dispatch(actionOptions(opt));
  return dispatch(getQuestions(allQuestions.results));
};

export default fetchQuestionsAction;
