import * as Type from "./types";

const initialState = {
  response: null,
  detail: {},
  loading: false,
  error: null,
};

export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.CLEAR_GROUPS_RESPONSE:
      return { ...state, response: null, detail: {} };

    case Type.CLEAR_GROUPS_ERROR:
      return { ...state, error: null };

    case Type.GET_GROUPS_REQUEST:
    case Type.GET_GROUPS_DETAIL_REQUEST:
    case Type.POST_CREATE_GROUP_REQUEST:
    case Type.POST_JOIN_GROUP_REQUEST:
    case Type.POST_ADD_USERS_REQUEST:
    case Type.PATCH_NAME_REQUEST:
    case Type.DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case Type.GET_GROUPS_SUCCESS:
    case Type.POST_CREATE_GROUP_SUCCESS:
    case Type.POST_JOIN_GROUP_SUCCESS:
    case Type.POST_ADD_USERS_SUCCESS:
    case Type.PATCH_NAME_SUCCESS:
    case Type.DELETE_USER_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case Type.GET_GROUPS_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: { ...state.detail, [action.payload.uuid]: action.payload },
      };

    case Type.GET_GROUPS_FAILURE:
    case Type.GET_GROUPS_DETAIL_FAILURE:
    case Type.POST_CREATE_GROUP_FAILURE:
    case Type.POST_JOIN_GROUP_FAILURE:
    case Type.POST_ADD_USERS_FAILURE:
    case Type.PATCH_NAME_FAILURE:
    case Type.DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
