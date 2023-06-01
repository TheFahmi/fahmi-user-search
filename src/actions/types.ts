export const SEARCH_USERS = 'SEARCH_USERS';
export const GET_USER = 'GET_USER';

export interface SearchUsersAction {
  type: typeof SEARCH_USERS;
  payload: any[];
}

export interface GetUserAction {
  type: typeof GET_USER;
  payload: any;
}

export type UserActionTypes = SearchUsersAction | GetUserAction;
