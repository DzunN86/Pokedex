import {LOGUT_USER, SET_USER} from '../types';

const initialState = {
  userData: {},
  isLogin: false,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userData: action.payload,
        isLogin: true,
      };
    case LOGUT_USER:
      return {
        ...state,
        userData: {},
        isLogin: false,
      };

    default:
      return state;
  }
};
