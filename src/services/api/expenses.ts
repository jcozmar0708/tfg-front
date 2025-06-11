import { EXPENSES } from "..";
import { buildPetition } from "../../helpers/apiRequest";
import ApiResponseError from "../../models/ApiResponseError";
import { CreateExpenseDto } from "../../models/expenses/create-expense.dto";
import { PayDebtDto } from "../../models/expenses/pay-debt.dto";
import {
  handleErrors,
  handleUnexpectedError,
} from "../interceptor/errorInterceptor";

export const getUserDebts = async (
  queryParams: Map<string, string | number>
) => {
  const { url, init } = buildPetition(
    EXPENSES().GET_USER_DEBTS,
    "GET",
    queryParams
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

export const postCreateExpense = async (body: CreateExpenseDto) => {
  const { url, init } = buildPetition(
    EXPENSES().POST_CREATE_EXPENSE,
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

export const postPayInCash = async (body: PayDebtDto) => {
  const { url, init } = buildPetition(
    EXPENSES().POST_PAY_IN_CASH,
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
