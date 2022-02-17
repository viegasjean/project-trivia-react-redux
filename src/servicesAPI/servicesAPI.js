export const fetchToken = async () => {
  try {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const fetchQuestions = async (token) => {
  try {
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};
