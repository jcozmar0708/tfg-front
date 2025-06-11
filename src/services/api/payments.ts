import { PAYMENTS } from "..";
import { buildPetition } from "../../helpers/apiRequest";
import ApiResponseError from "../../models/ApiResponseError";
import { CaptureOrderDto } from "../../models/payments/capture-order.dto";
import { CreateOrderDto } from "../../models/payments/create-order.dto";
import {
  handleErrors,
  handleUnexpectedError,
} from "../interceptor/errorInterceptor";

export const postOrder = async (body: CreateOrderDto) => {
  const { url, init } = buildPetition(
    PAYMENTS().POST_ORDER,
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

export const postCapture = async (body: CaptureOrderDto) => {
  const { url, init } = buildPetition(
    PAYMENTS().POST_CAPTURE,
    "POST",
    undefined,
    body
  );

  try {
    const response = await fetch(url, init);
    await handleErrors(response);
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    handleUnexpectedError(error);
  }
};
