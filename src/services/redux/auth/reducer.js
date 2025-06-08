import * as Type from "./types";

const initialState = {
  response: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.CLEAR_AUTH_RESPONSE:
      return { ...state, response: null };

    case Type.CLEAR_AUTH_ERROR:
      return { ...state, error: null };

    case Type.POST_LOGIN_REQUEST:
    case Type.DELETE_LOGOUT_REQUEST:
    case Type.DELETE_LOGOUT_ALL_REQUEST:
      return { ...state, loading: true, error: null };

    case Type.POST_LOGIN_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case Type.DELETE_LOGOUT_SUCCESS:
    case Type.DELETE_LOGOUT_ALL_SUCCESS:
      return { ...state, loading: false, response: null };

    case Type.POST_LOGIN_FAILURE:
    case Type.DELETE_LOGOUT_FAILURE:
    case Type.DELETE_LOGOUT_ALL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
