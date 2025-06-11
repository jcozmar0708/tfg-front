import * as Type from "./types";

const initialState = {
  response: null,
  success: false,
  loading: false,
  error: null,
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.CLEAR_PAYMENTS_RESPONSE:
      return { ...state, response: null, success: false };

    case Type.CLEAR_PAYMENTS_ERROR:
      return { ...state, error: null };

    case Type.POST_ORDER_REQUEST:
    case Type.POST_CAPTURE_REQUEST:
      return { ...state, loading: true, error: null };

    case Type.POST_ORDER_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case Type.POST_CAPTURE_SUCCESS:
      return { ...state, loading: false, success: true };

    case Type.POST_ORDER_FAILURE:
    case Type.POST_CAPTURE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
