import * as Type from "./types";

export const clearGroupsResponse = () => ({
  type: Type.CLEAR_GROUPS_RESPONSE,
});

export const clearGroupsError = () => ({
  type: Type.CLEAR_GROUPS_ERROR,
});

export const getGroupsRequest = () => ({
  type: Type.GET_GROUPS_REQUEST,
});

export const getGroupsSuccess = (response) => ({
  type: Type.GET_GROUPS_SUCCESS,
  payload: response,
});

export const getGroupsFailure = (error) => ({
  type: Type.GET_GROUPS_DETAIL_FAILURE,
  payload: error,
});

export const getGroupsDetailRequest = (uuid) => ({
  type: Type.GET_GROUPS_DETAIL_REQUEST,
  payload: uuid,
});

export const getGroupsDetailSuccess = (response) => ({
  type: Type.GET_GROUPS_DETAIL_SUCCESS,
  payload: response,
});

export const getGroupsDetailFailure = (error) => ({
  type: Type.GET_GROUPS_DETAIL_FAILURE,
  payload: error,
});

export const postCreateGroupRequest = (body) => ({
  type: Type.POST_CREATE_GROUP_REQUEST,
  payload: body,
});

export const postCreateGroupSuccess = (response) => ({
  type: Type.POST_CREATE_GROUP_SUCCESS,
  payload: response,
});

export const postCreateGroupFailure = (error) => ({
  type: Type.POST_CREATE_GROUP_FAILURE,
  payload: error,
});

export const postJoinGroupRequest = (params) => ({
  type: Type.POST_JOIN_GROUP_REQUEST,
  payload: params,
});

export const postJoinGroupSuccess = (response) => ({
  type: Type.POST_JOIN_GROUP_REQUEST,
  payload: response,
});

export const postJoinGroupFailure = (error) => ({
  type: Type.POST_JOIN_GROUP_FAILURE,
  payload: error,
});

export const postAddUsersRequest = (params) => ({
  type: Type.POST_ADD_USERS_REQUEST,
  payload: params,
});

export const postAddUsersSuccess = (response) => ({
  type: Type.POST_ADD_USERS_SUCCESS,
  payload: response,
});

export const postAddUsersFailure = (error) => ({
  type: Type.POST_ADD_USERS_FAILURE,
  payload: error,
});

export const patchNameRequest = (params) => ({
  type: Type.PATCH_NAME_REQUEST,
  payload: params,
});

export const patchNameSuccess = (response) => ({
  type: Type.PATCH_NAME_SUCCESS,
  payload: response,
});

export const patchNameFailure = (error) => ({
  type: Type.PATCH_NAME_FAILURE,
  payload: error,
});

export const deleteUserRequest = (params) => ({
  type: Type.DELETE_USER_REQUEST,
  payload: params,
});

export const deleteUserSuccess = (response) => ({
  type: Type.DELETE_USER_SUCCESS,
  payload: response,
});

export const deleteUserFailure = (error) => ({
  type: Type.DELETE_USER_FAILURE,
  payload: error,
});
