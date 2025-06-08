import { call, put, takeLatest } from "redux-saga/effects";
import * as Api from "../../api/users";
import * as Action from "./actions";
import * as Type from "./types";

function* getProfileSaga() {
  try {
    const response = yield call(Api.getProfile);

    yield put(Action.postRegisterSuccess(response));
  } catch (error) {
    yield put(Action.postRegisterFailure(error.message));
  }
}

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

function* postForgotPasswordSaga(action) {
  try {
    const response = yield call(Api.postForgotPassword, action.payload);

    yield put(Action.postForgotPasswordSuccess(response));
  } catch (error) {
    yield put(Action.postForgotPasswordFailure(error.message));
  }
}

function* postResetPasswordSaga(action) {
  try {
    const response = yield call(Api.postResetPassword, action.payload);

    yield put(Action.postResetPasswordSuccess(response));
  } catch (error) {
    yield put(Action.postResetPasswordFailure(error.message));
  }
}

function* patchUpdateProfileSaga(action) {
  try {
    const response = yield call(Api.patchUpdateProfile, action.payload);

    yield put(Action.patchUpdateProfileSuccess(response));
  } catch (error) {
    yield put(Action.patchUpdateProfileFailure(error.message));
  }
}

export default function* usersSaga() {
  yield takeLatest(Type.GET_PROFILE_REQUEST, getProfileSaga);
  yield takeLatest(Type.POST_REGISTER_REQUEST, postRegisterSaga);
  yield takeLatest(Type.POST_VERIFY_EMAIL_REQUEST, postVerifyEmailSaga);
  yield takeLatest(
    Type.POST_RESEND_VERIFICATION_CODE_REQUEST,
    postResendVerificationCodeSaga
  );
  yield takeLatest(Type.POST_FORGOT_PASSWORD_REQUEST, postForgotPasswordSaga);
  yield takeLatest(Type.POST_RESET_PASSWORD_REQUEST, postResetPasswordSaga);
  yield takeLatest(Type.PATCH_UPDATE_PROFILE_REQUEST, patchUpdateProfileSaga);
}
