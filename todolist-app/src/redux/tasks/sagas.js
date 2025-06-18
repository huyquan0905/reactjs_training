// redux/tasks/sagas.js
import { call, put, takeEvery, all } from "redux-saga/effects";
import { apiClient } from "../../api/helpers/api_helper";
import {
  TASKS_GET,
  TASK_ADD,
  TASK_UPDATE,
  TASKS_REMOVE,
} from "../../constants/url";

function* getTasksSaga() {
  try {
    yield put({ type: "tasks/get" });
    const response = yield call(apiClient.get, TASKS_GET);
    yield put({ type: "tasks/getSuccess", payload: response.data });
  } catch (err) {
    console.error("getTasksSaga error:", err);
  }
}

function* addTaskSaga(action) {
  try {
    yield put({ type: "tasks/add" });
    const response = yield call(apiClient.post, TASK_ADD, action.payload);
    yield put({ type: "tasks/addSuccess", payload: response.data.data });
  } catch (err) {
    console.error("addTaskSaga error:", err);
  }
}

function* updateTaskSaga(action) {
  try {
    const payload = { _id: action.payload.id, text: action.payload.text };
    yield call(apiClient.put, TASK_UPDATE, payload);
    yield put({ type: "tasks/updateSuccess", payload });
  } catch (err) {
    console.error("updateTaskSaga error:", err);
  }
}

function* toggleTaskSaga(action) {
  try {
    const payload = {
      _id: action.payload.id,
      completed: action.payload.completed,
    };
    yield call(apiClient.put, TASK_UPDATE, payload);
    yield put({ type: "tasks/toggleSuccess", payload });
  } catch (err) {
    console.error("toggleTaskSaga error:", err);
  }
}

function* deleteTaskSaga(action) {
  try {
    yield call(apiClient.delete, TASKS_REMOVE, {
      data: { _id: action.payload },
    });
    yield put({ type: "tasks/deleteSuccess", payload: action.payload });
  } catch (err) {
    console.error("deleteTaskSaga error:", err);
  }
}

export default function* taskSagas() {
  yield all([
    takeEvery("tasks/fetch", getTasksSaga),
    takeEvery("tasks/addRequest", addTaskSaga),
    takeEvery("tasks/updateRequest", updateTaskSaga),
    takeEvery("tasks/toggleRequest", toggleTaskSaga),
    takeEvery("tasks/deleteRequest", deleteTaskSaga),
  ]);
}
