import { call, put, takeLatest } from "redux-saga/effects";
import * as Api from "../../api/expenses";
import * as Action from "./actions";
import * as Type from "./types";

function* getUserDebtsSaga(action) {
  try {
    const response = yield call(Api.getUserDebts, action.payload);

    yield put(Action.getUserDebtsSuccess(response));
  } catch (error) {
    yield put(Action.getUserDebtsFailure(error.message));
  }
}

function* postCreateExpenseSaga(action) {
  try {
    const response = yield call(Api.postCreateExpense, action.payload);

    yield put(Action.postCreateExpenseSuccess(response));
  } catch (error) {
    yield put(Action.postCreateExpenseFailure(error.message));
  }
}

function* postPayInCashSaga(action) {
  try {
    const response = yield call(Api.postPayInCash, action.payload);

    yield put(Action.postPayInCashSuccess(response));
  } catch (error) {
    yield put(Action.postPayInCashFailure(error.message));
  }
}

export default function* expensesSaga() {
  yield takeLatest(Type.GET_USER_DEBTS_REQUEST, getUserDebtsSaga);
  yield takeLatest(Type.POST_CREATE_EXPENSE_REQUEST, postCreateExpenseSaga);
  yield takeLatest(Type.POST_PAY_IN_CASH_REQUEST, postPayInCashSaga);
}
