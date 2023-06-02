export const SEARCH_USERS = 'SEARCH_USERS';
export const GET_USER = 'GET_USER';

export interface SearchUsersAction {
  type: typeof SEARCH_USERS;
  payload: User[];
}

export interface GetUserAction {
  type: typeof GET_USER;
  payload: UserDetails;
}

export type UserActionTypes = SearchUsersAction | GetUserAction;

interface User {
  id: number;
  login: string;
}

interface UserDetails {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

