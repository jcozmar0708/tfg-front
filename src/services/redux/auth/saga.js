import { call, put, takeLatest } from "redux-saga/effects";
import * as Api from "../../api/auth";
import * as Action from "./actions";
import * as Type from "./types";

function* postLoginSaga(action) {
  try {
    const response = yield call(Api.postLogin, action.payload);

    yield put(Action.postLoginSuccess(response));
  } catch (error) {
    yield put(Action.postLoginFailure(error.message));
  }
}

function* deleteLogoutSaga() {
  try {
    const response = yield call(Api.deleteLogout);

    yield put(Action.deleteLogoutSuccess(response));
  } catch (error) {
    yield put(Action.deleteLogoutFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(Type.POST_LOGIN_REQUEST, postLoginSaga);
  yield takeLatest(Type.DELETE_LOGOUT_REQUEST, deleteLogoutSaga);
}
