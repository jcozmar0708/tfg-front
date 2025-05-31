import { all } from "redux-saga/effects";
import authSaga from "../services/redux/auth/saga";
import usersSaga from "../services/redux/users/saga";

export default function* rootSaga() {
  yield all([authSaga(), usersSaga()]);
}
