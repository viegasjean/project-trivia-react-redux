import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Ranking() {
  const history = useHistory();
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  ranking.sort((a, b) => a.score - b.score);
  return (
    <>
      <h1 data-testid="ranking-title">Ranking Page</h1>
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => history.push('/') }
      >
        Play Again
      </button>
      {
        ranking.map((rank, index) => (
          <>
            <h5 data-testid={ `player-name-${index}` }>{rank.name}</h5>
            <h5 data-testid={ `player-score-${index}` }>{rank.score}</h5>
          </>
        ))
      }
    </>
  );
}
