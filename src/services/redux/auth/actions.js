import * as Type from "./types";

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

export const deleteLogoutAllRequest = () => ({
  type: Type.DELETE_LOGOUT_ALL_REQUEST,
});

export const deleteLogoutAllSuccess = () => ({
  type: Type.DELETE_LOGOUT_ALL_SUCCESS,
});

export const deleteLogoutAllFailure = (error) => ({
  type: Type.DELETE_LOGOUT_ALL_FAILURE,
  payload: error,
});
