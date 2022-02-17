// import { fetchQuestions, fetchToken } from '../../servicesAPI/servicesAPI';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const FAILED_REQUEST = 'FAILED_REQUEST';

// function requestQuestions() {
//   return { type: REQUEST_QUESTIONS };
// }

export function getQuestions(data) {
  return { type: GET_QUESTIONS, payload: data };
}

// function failedRequest(error) {
//   return { type: 'FAILED_REQUEST', payload: error };
// }

// const fetchQuestionsAction = (token) => async (dispatch) => {
//   dispatch(requestQuestions());
//   const allQuestions = await fetchQuestions(token);
//   if (allQuestions.response_code !== 0) {
//     const data = await fetchToken();
//     return fetchQuestionsAction(data.token);
//   }
//   return dispatch(getQuestions(allQuestions.results));
// };

// export default fetchQuestionsAction;
