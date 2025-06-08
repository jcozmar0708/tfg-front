import { all } from "redux-saga/effects";
import authSaga from "../services/redux/auth/saga";
import usersSaga from "../services/redux/users/saga";
import groupsSaga from "../services/redux/groups/saga";

export default function* rootSaga() {
  yield all([authSaga(), usersSaga(), groupsSaga()]);
}
