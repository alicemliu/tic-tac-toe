import { AUTH_TOKEN_KEY, AUTH_URL } from './constants';

export const generateToken = async (email: string) => {
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

export const getToken = () => {
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export const setToken = (token: string) => {
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}