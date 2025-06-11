import { call, put, takeLatest } from "redux-saga/effects";
import * as Api from "../../api/payments";
import * as Action from "./actions";
import * as Type from "./types";

function* postOrderSaga(action) {
  try {
    const response = yield call(Api.postOrder, action.payload);

    yield put(Action.postOrderSuccess(response));
  } catch (error) {
    yield put(Action.postOrderFailure(error.message));
  }
}

function* postCaptureSaga(action) {
  try {
    yield call(Api.postCapture, action.payload);

    yield put(Action.postCaptureSuccess());
  } catch (error) {
    yield put(Action.postCaptureFailure(error.message));
  }
}

export default function* paymentsSaga() {
  yield takeLatest(Type.POST_ORDER_REQUEST, postOrderSaga);
  yield takeLatest(Type.POST_CAPTURE_REQUEST, postCaptureSaga);
}
