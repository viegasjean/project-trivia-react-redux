const RANKING_KEY = 'ranking';

if (!JSON.parse(localStorage.getItem(RANKING_KEY))) {
  localStorage.setItem(RANKING_KEY, JSON.stringify([]));
}

export const getRanking = JSON.parse(localStorage.getItem(RANKING_KEY));

const saveToRanking = (result) => localStorage
  .setItem(RANKING_KEY, JSON.stringify(result));

export const addToRanking = (name, score) => {
  if (name && score) {
    const ranking = getRanking;
    const index = ranking.length;
    saveToRanking([...ranking, { index, name, score }]);
  }
};
