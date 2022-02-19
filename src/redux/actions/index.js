export const GET_TOKEN = 'GET_TOKEN';
export const PLAYER_DATA = 'PLAYER_DATA';

export const tokenAction = (token) => ({
  type: GET_TOKEN,
  token,
});

export const playerAction = (payload) => ({
  type: PLAYER_DATA,
  payload,
});
