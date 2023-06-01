import { Dispatch } from 'redux';
import { getUsers, getUserDetails } from '../api/githubApi';
import { SEARCH_USERS, GET_USER, UserActionTypes } from './types';

export const searchUsers = (query: string) => async (dispatch: Dispatch<UserActionTypes>) => {
  try {
    const response = await getUsers(query);
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items,
    });
  } catch (error) {
    console.error('Error searching users:', error);
  }
};

export const getUser = (username: string) => async (dispatch: Dispatch<UserActionTypes>): Promise<void> => {
  try {
    const response = await getUserDetails(username);
    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error getting user:', error);
  }
};
