import { GROUPS } from "..";
import { buildPetition } from "../../helpers/apiRequest";
import ApiResponseError from "../../models/ApiResponseError";
import { AddUsersDto } from "../../models/groups/add-users.dto";
import { CreateGroupDto } from "../../models/groups/create-group.dto";
import { NameOnlyDto } from "../../models/groups/name-only.dto";
import {
  handleErrors,
  handleUnexpectedError,
} from "../interceptor/errorInterceptor";

export const getGroups = async () => {
  const { url, init } = buildPetition(GROUPS().GET_GROUPS, "GET");

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};

export const getGroupsDetail = async (groupUUID: string) => {
  const { url, init } = buildPetition(
    GROUPS(groupUUID).GET_GROUPS_DETAIL,
    "GET"
  );

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};

export const postCreateGroup = async (body: CreateGroupDto) => {
  const { url, init } = buildPetition(
    GROUPS().POST_CREATE_GROUP,
    "POST",
    undefined,
    body
  );

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};

export const postJoinGroup = async (code: string) => {
  const { url, init } = buildPetition(GROUPS(code).POST_JOIN_GROUP, "POST");

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};

export const postAddUsers = async (params: {
  groupUUID: string;
  body: AddUsersDto;
}) => {
  const { url, init } = buildPetition(
    GROUPS(params.groupUUID).POST_ADD_USERS,
    "POST",
    undefined,
    params.body
  );

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};

export const patchName = async (params: {
  groupUUID: string;
  body: NameOnlyDto;
}) => {
  const { url, init } = buildPetition(
    GROUPS(params.groupUUID).PATCH_NAME,
    "PATCH",
    undefined,
    params.body
  );

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};

export const deleteUser = async (params: {
  groupUUID: string;
  email: string;
}) => {
  const { url, init } = buildPetition(
    GROUPS(params.groupUUID, params.email).DELETE_USER,
    "DELETE"
  );

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};
