import { AUTH } from "..";
import { buildPetition } from "../../helpers/apiRequest";
import ApiResponseError from "../../models/ApiResponseError";
import { CreateLoginDto } from "../../models/auth/create-login.dto";
import {
  handleErrors,
  handleUnexpectedError,
} from "../interceptor/errorInterceptor";

export const postLogin = async (body: CreateLoginDto) => {
  const { url, init } = buildPetition(
    AUTH().POST_LOGIN,
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

export const deleteLogout = async () => {
  const { url, init } = buildPetition(AUTH().DELETE_LOGOUT, "DELETE");

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};

export const deleteLogoutAll = async () => {
  const { url, init } = buildPetition(AUTH().DELETE_LOGOUT_ALL, "DELETE");

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};
