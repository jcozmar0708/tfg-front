import { call, put, takeLatest } from "redux-saga/effects";
import * as Api from "../../api/groups";
import * as Action from "./actions";
import * as Type from "./types";

function* getGroupsSaga() {
  try {
    const response = yield call(Api.getGroups);

    yield put(Action.getGroupsSuccess(response));
  } catch (error) {
    yield put(Action.getGroupsFailure(error.message));
  }
}

function* getGroupsDetailSaga(action) {
  try {
    const response = yield call(Api.getGroupsDetail, action.payload);

    yield put(Action.getGroupsDetailSuccess(response));
  } catch (error) {
    yield put(Action.getGroupsDetailFailure(error.message));
  }
}

function* postCreateGroupSaga(action) {
  try {
    const response = yield call(Api.postCreateGroup, action.payload);

    yield put(Action.postCreateGroupSuccess(response));
  } catch (error) {
    yield put(Action.postCreateGroupFailure(error.message));
  }
}

function* postJoinGroupSaga(action) {
  try {
    const response = yield call(Api.postJoinGroup, action.payload);

    yield put(Action.postJoinGroupSuccess(response));
  } catch (error) {
    yield put(Action.postJoinGroupFailure(error.message));
  }
}

function* postAddUsersSaga(action) {
  try {
    const response = yield call(Api.postAddUsers, action.payload);

    yield put(Action.postAddUsersSuccess(response));
  } catch (error) {
    yield put(Action.postAddUsersFailure(error.message));
  }
}

function* patchNameSaga(action) {
  try {
    const response = yield call(Api.patchName, action.payload);

    yield put(Action.patchNameSuccess(response));
  } catch (error) {
    yield put(Action.patchNameFailure(error.message));
  }
}

function* deleteUserSaga(action) {
  try {
    const response = yield call(Api.deleteUser, action.payload);

    yield put(Action.deleteUserSuccess(response));
  } catch (error) {
    yield put(Action.deleteUserFailure(error.message));
  }
}

export default function* groupsSaga() {
  yield takeLatest(Type.GET_GROUPS_REQUEST, getGroupsSaga);
  yield takeLatest(Type.GET_GROUPS_DETAIL_REQUEST, getGroupsDetailSaga);
  yield takeLatest(Type.POST_CREATE_GROUP_REQUEST, postCreateGroupSaga);
  yield takeLatest(Type.POST_JOIN_GROUP_REQUEST, postJoinGroupSaga);
  yield takeLatest(Type.POST_ADD_USERS_REQUEST, postAddUsersSaga);
  yield takeLatest(Type.PATCH_NAME_REQUEST, patchNameSaga);
  yield takeLatest(Type.DELETE_USER_REQUEST, deleteUserSaga);
}
