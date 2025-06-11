import * as Type from "./types";

export const clearAuthResponse = () => ({
  type: Type.CLEAR_AUTH_RESPONSE,
});

export const clearAuthError = () => ({
  type: Type.CLEAR_AUTH_ERROR,
});

export const postLoginRequest = (body) => ({
  type: Type.POST_LOGIN_REQUEST,
  payload: body,
});

export const postLoginSuccess = (response) => ({
  type: Type.POST_LOGIN_SUCCESS,
  payload: response,
});

export const postLoginFailure = (error) => ({
  type: Type.POST_LOGIN_FAILURE,
  payload: error,
});

export const deleteLogoutRequest = () => ({
  type: Type.DELETE_LOGOUT_REQUEST,
});

export const deleteLogoutSuccess = () => ({
  type: Type.DELETE_LOGOUT_SUCCESS,
});

export const deleteLogoutFailure = (error) => ({
  type: Type.DELETE_LOGOUT_FAILURE,
  payload: error,
});
