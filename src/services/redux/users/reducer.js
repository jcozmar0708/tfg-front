import * as Type from "./types";

const initialState = {
  response: null,
  loading: false,
  error: null,
  type: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.CLEAR_USERS_RESPONSE:
      return { ...state, response: null };

    case Type.CLEAR_USERS_ERROR:
      return { ...state, error: null };

    case Type.POST_REGISTER_REQUEST:
      return { ...state, loading: true, error: null, type: "register" };

    case Type.POST_VERIFY_EMAIL_REQUEST:
      return { ...state, loading: true, error: null, type: "verifyEmail" };

    case Type.POST_RESEND_VERIFICATION_CODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        type: "resendVerificationCode",
      };

    case Type.PATCH_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null, type: "updateProfile" };

    case Type.GET_PROFILE_REQUEST:
    case Type.POST_FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };

    case Type.POST_RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null, type: "resetPassword" };

    case Type.GET_PROFILE_SUCCESS:
    case Type.POST_REGISTER_SUCCESS:
    case Type.POST_VERIFY_EMAIL_SUCCESS:
    case Type.POST_RESEND_VERIFICATION_CODE_SUCCESS:
    case Type.POST_FORGOT_PASSWORD_SUCCESS:
    case Type.POST_RESET_PASSWORD_SUCCESS:
    case Type.PATCH_UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case Type.GET_PROFILE_FAILURE:
    case Type.POST_REGISTER_FAILURE:
    case Type.POST_VERIFY_EMAIL_FAILURE:
    case Type.POST_RESEND_VERIFICATION_CODE_FAILURE:
    case Type.POST_FORGOT_PASSWORD_FAILURE:
    case Type.POST_RESET_PASSWORD_FAILURE:
    case Type.PATCH_UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
