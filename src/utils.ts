import { AUTH_TOKEN_KEY, AUTH_URL, ENGINE_URL } from './constants';

export async function generateToken (email: string) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  };

  try {
    const response = await fetch(AUTH_URL, options);

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data?.token;

  } catch (error) {
    throw new Error('Error generating token')
  }
}

export function getToken() {
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken (token: string) {
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}

export async function generateMove (board: Board) {
  const token = getToken();
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ board })
  };

  try {
    const response = await fetch(ENGINE_URL, options);

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data?.board;

  } catch (error) {
    throw new Error('Error generating token')
  }
}

export function checkWinner (board: Board) {
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] &&
      board[row][0] === board[row][1] &&
      board[row][0] === board[row][2]
    ) {
      return board[row][0];
    }
  }

  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] &&
      board[0][col] === board[1][col] &&
      board[0][col] === board[2][col]
    ) {
      return board[0][col];
    }
  }

  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return board[0][0];
  }

  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return board[0][2];
  }

  return undefined;
}

export function checkFull (board: Board) {
  return !board.flat().some(val => val === '');
}