import { SEARCH_USERS, GET_USER, UserActionTypes } from '../actions/types';

export interface UserState {
  userList: any[];
  userDetails: any | null;
}

const initialState: UserState = {
  userList: [],
  userDetails: null,
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        userList: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
