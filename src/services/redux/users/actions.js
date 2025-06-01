import * as Type from "./types";

export const clearUsersResponse = () => ({
  type: Type.CLEAR_USERS_RESPONSE,
});

export const clearUsersError = () => ({
  type: Type.CLEAR_USERS_ERROR,
});

export const postRegisterRequest = (body) => ({
  type: Type.POST_REGISTER_REQUEST,
  payload: body,
});

export const postRegisterSuccess = (response) => ({
  type: Type.POST_REGISTER_SUCCESS,
  payload: response,
});

export const postRegisterFailure = (error) => ({
  type: Type.POST_REGISTER_FAILURE,
  payload: error,
});

export const postVerifyEmailRequest = (body) => ({
  type: Type.POST_VERIFY_EMAIL_REQUEST,
  payload: body,
});

export const postVerifyEmailSuccess = (response) => ({
  type: Type.POST_VERIFY_EMAIL_SUCCESS,
  payload: response,
});

export const postVerifyEmailFailure = (error) => ({
  type: Type.POST_VERIFY_EMAIL_FAILURE,
  payload: error,
});

export const postResendVerificationCodeRequest = (body) => ({
  type: Type.POST_RESEND_VERIFICATION_CODE_REQUEST,
  payload: body,
});

export const postResendVerificationCodeSuccess = (response) => ({
  type: Type.POST_RESEND_VERIFICATION_CODE_SUCCESS,
  payload: response,
});

export const postResendVerificationCodeFailure = (error) => ({
  type: Type.POST_RESEND_VERIFICATION_CODE_FAILURE,
  payload: error,
});

export const postForgotPasswordRequest = (body) => ({
  type: Type.POST_FORGOT_PASSWORD_REQUEST,
  payload: body,
});

export const postForgotPasswordSuccess = (response) => ({
  type: Type.POST_FORGOT_PASSWORD_SUCCESS,
  payload: response,
});

export const postForgotPasswordFailure = (error) => ({
  type: Type.POST_FORGOT_PASSWORD_FAILURE,
  payload: error,
});

export const postResetPasswordRequest = (body) => ({
  type: Type.POST_RESET_PASSWORD_REQUEST,
  payload: body,
});

export const postResetPasswordSuccess = (response) => ({
  type: Type.POST_RESET_PASSWORD_SUCCESS,
  payload: response,
});

export const postResetPasswordFailure = (error) => ({
  type: Type.POST_RESET_PASSWORD_FAILURE,
  payload: error,
});
