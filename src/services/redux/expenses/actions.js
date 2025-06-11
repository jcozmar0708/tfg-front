import * as Type from "./types";

export const clearExpensesResponse = () => ({
  type: Type.CLEAR_EXPENSES_RESPONSE,
});

export const clearExpensesError = () => ({
  type: Type.CLEAR_EXPENSES_ERROR,
});

export const getUserDebtsRequest = (queryParams) => ({
  type: Type.GET_USER_DEBTS_REQUEST,
  payload: queryParams,
});

export const getUserDebtsSuccess = (response) => ({
  type: Type.GET_USER_DEBTS_SUCCESS,
  payload: response,
});

export const getUserDebtsFailure = (error) => ({
  type: Type.GET_USER_DEBTS_FAILURE,
  payload: error,
});

export const postCreateExpenseRequest = (body) => ({
  type: Type.POST_CREATE_EXPENSE_REQUEST,
  payload: body,
});

export const postCreateExpenseSuccess = (response) => ({
  type: Type.POST_CREATE_EXPENSE_SUCCESS,
  payload: response,
});

export const postCreateExpenseFailure = (error) => ({
  type: Type.POST_CREATE_EXPENSE_FAILURE,
  payload: error,
});

export const postPayInCashRequest = (body) => ({
  type: Type.POST_PAY_IN_CASH_REQUEST,
  payload: body,
});

export const postPayInCashSuccess = (response) => ({
  type: Type.POST_PAY_IN_CASH_SUCCESS,
  payload: response,
});

export const postPayInCashFailure = (error) => ({
  type: Type.POST_PAY_IN_CASH_FAILURE,
  payload: error,
});
