import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

export const getUsers = (query: string) => {
  const url = `${API_BASE_URL}/search/users?q=${query}&per_page=5`;
  return axios.get(url);
};

export const getUserDetails = (username: string) => {
  const url = `${API_BASE_URL}/users/${username}/repos`;
  return axios.get(url);
};