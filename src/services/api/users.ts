import { USERS } from "..";
import { buildPetition } from "../../helpers/apiRequest";
import ApiResponseError from "../../models/ApiResponseError";
import { CreateUserDto } from "../../models/users/create-user.dto";
import { ResetPasswordDto } from "../../models/users/reset-password.dto";
import { EmailVerificationDto } from "../../models/users/verify-email.dto";
import {
  handleErrors,
  handleUnexpectedError,
} from "../interceptor/errorInterceptor";

export const postRegister = async (body: CreateUserDto) => {
  const { url, init } = buildPetition(
    USERS().POST_REGISTER,
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

export const postVerifyEmail = async (body: EmailVerificationDto) => {
  const { url, init } = buildPetition(
    USERS().POST_VERIFY_EMAIL,
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

export const postResendVerificationCode = async (body: { email: string }) => {
  const { url, init } = buildPetition(
    USERS().POST_RESEND_VERIFICATION_CODE,
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

export const postForgotPassword = async (body: { email: string }) => {
  const { url, init } = buildPetition(
    USERS().POST_FORGOT_PASSWORD,
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

export const postResetPassword = async (body: ResetPasswordDto) => {
  const { url, init } = buildPetition(
    USERS().POST_RESET_PASSWORD,
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
