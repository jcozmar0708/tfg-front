import * as Type from "./types";

export const clearPaymentsResponse = () => ({
  type: Type.CLEAR_PAYMENTS_RESPONSE,
});

export const clearPaymentsError = () => ({
  type: Type.CLEAR_PAYMENTS_ERROR,
});

export const postOrderRequest = (body) => ({
  type: Type.POST_ORDER_REQUEST,
  payload: body,
});

export const postOrderSuccess = (response) => ({
  type: Type.POST_ORDER_SUCCESS,
  payload: response,
});

export const postOrderFailure = (error) => ({
  type: Type.POST_ORDER_FAILURE,
  payload: error,
});

export const postCaptureRequest = (body) => ({
  type: Type.POST_CAPTURE_REQUEST,
  payload: body,
});

export const postCaptureSuccess = () => ({
  type: Type.POST_CAPTURE_SUCCESS,
});

export const postCaptureFailure = (error) => ({
  type: Type.POST_CAPTURE_FAILURE,
  payload: error,
});
