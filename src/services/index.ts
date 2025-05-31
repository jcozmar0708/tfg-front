const BASIC_URL = import.meta.env.VITE_BASIC_URL;

export const AUTH = () => ({
  POST_LOGIN: `${BASIC_URL}/auth/login`,

  DELETE_LOGOUT: `${BASIC_URL}/auth/logout`,

  DELETE_LOGOUT_ALL: `${BASIC_URL}/auth/logout-all`,
});

export const USERS = () => ({
  GET_PROFILE: `${BASIC_URL}/users/profile`,

  POST_REGISTER: `${BASIC_URL}/users/register`,

  POST_VERIFY_EMAIL: `${BASIC_URL}/users/verify-email`,

  POST_RESEND_VERIFICATION_CODE: `${BASIC_URL}/users/resend-verification-code`,

  POST_FORGOT_PASSWORD: `${BASIC_URL}/users/forgot-password`,

  POST_RESET_PASSWORD: `${BASIC_URL}/users/reset-password`,

  PATCH_UPDATE_PROFILE: `${BASIC_URL}/users/update-profile`,
});
