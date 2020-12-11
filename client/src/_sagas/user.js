import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from './types'

function logInAPI(data) {
  return axios.post('/api/user/login', data)
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGIN_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_USER_REQUEST, logIn)
}


export default function* userSaga() {
  yield all([
    fork(watchLogin),
  ])
}