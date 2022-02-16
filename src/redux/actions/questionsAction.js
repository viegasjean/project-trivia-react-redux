// function requestQuestions() {
//   return { type: 'REQUEST_QUESTIONS' };
// }

function getQuestions(data) {
  return { type: 'GET_QUESTIONS', payload: data };
}

// function failedRequest(error) {
//   return { type: 'FAILED_REQUEST', payload: error };
// }

function fetchQuestionsAction(token) {
  return async (dispatch) => {
    // dispatch(requestQuestions());
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      console.log(data);
      return dispatch(getQuestions(data.results));
    } catch (error) {
      // dispatch(failedRequest(error));
    }
  };
}

export default fetchQuestionsAction;
