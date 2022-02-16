export const TOKEN_PLAYER = 'TOKEN_PLAYER';
export const PLAYER_DATA = 'PLAYER_DATA';

const tokenAction = (payload) => ({
  type: TOKEN_PLAYER,
  payload,
});

export default tokenAction;

export const playerAction = (payload) => ({
  type: PLAYER_DATA,
  payload,
});
