import { call, put, takeLatest } from "redux-saga/effects";
import * as Api from "../../api/users";
import * as Action from "./actions";
import * as Type from "./types";

function* postRegisterSaga(action) {
  try {
    const response = yield call(Api.postRegister, action.payload);

    yield put(Action.postRegisterSuccess(response));
  } catch (error) {
    yield put(Action.postRegisterFailure(error.message));
  }
}

function* postVerifyEmailSaga(action) {
  try {
    const response = yield call(Api.postVerifyEmail, action.payload);

    yield put(Action.postVerifyEmailSuccess(response));
  } catch (error) {
    yield put(Action.postVerifyEmailFailure(error.message));
  }
}

function* postResendVerificationCodeSaga(action) {
  try {
    const response = yield call(Api.postResendVerificationCode, action.payload);

    yield put(Action.postResendVerificationCodeSuccess(response));
  } catch (error) {
    yield put(Action.postResendVerificationCodeFailure(error.message));
  }
}

export default function* usersSaga() {
  yield takeLatest(Type.POST_REGISTER_REQUEST, postRegisterSaga);
  yield takeLatest(Type.POST_VERIFY_EMAIL_REQUEST, postVerifyEmailSaga);
  yield takeLatest(
    Type.POST_RESEND_VERIFICATION_CODE_REQUEST,
    postResendVerificationCodeSaga
  );
}
