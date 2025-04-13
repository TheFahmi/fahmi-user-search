import axios from 'axios';
import { GithubRepo, GithubUserSearchResponse } from '../types/github';

const API_BASE_URL = 'https://api.github.com';
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

export const searchUsers = async (query: string, perPage: number = 10): Promise<GithubUserSearchResponse> => {
  const response = await axiosInstance.get<GithubUserSearchResponse>(
    `/search/users?q=${encodeURIComponent(query)}&per_page=${perPage}`
  );
  return response.data;
};

export const getUserRepos = async (username: string, perPage: number = 10): Promise<GithubRepo[]> => {
  const response = await axiosInstance.get<GithubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&sort=updated`
  );
  return response.data;
};

export const getUserProfile = async (username: string) => {
  const response = await axiosInstance.get(`/users/${encodeURIComponent(username)}`);
  return response.data;
};