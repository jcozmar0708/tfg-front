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

export const GROUPS = (id?: string, email?: string) => ({
  GET_GROUPS: `${BASIC_URL}/groups`,

  GET_GROUPS_DETAIL: id ? `${BASIC_URL}/groups/${id}` : "",

  POST_CREATE_GROUP: `${BASIC_URL}/groups`,

  POST_JOIN_GROUP: id ? `${BASIC_URL}/groups/join/${id}` : "",

  POST_ADD_USERS: id ? `${BASIC_URL}/groups/${id}/add-user` : "",

  PATCH_NAME: id ? `${BASIC_URL}/groups/${id}` : "",

  DELETE_USER:
    id && email ? `${BASIC_URL}/groups/${id}/remove-user/${email}` : "",
});
