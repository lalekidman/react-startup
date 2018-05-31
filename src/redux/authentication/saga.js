import {put, all, call, takeLatest} from 'redux-saga/effects'
import * as types from './constants'
import {authenticateUser} from './api'
function * authenticationWorker ({data}) {
  try {
    yield call(authenticateUser, data)
  } catch (err) {
    yield put({
      type: types.AUTHENTICATION_REQUEST_FAILED,
      error: err.message
    })
  }
}
export default function * () {
  yield all([
    takeLatest(types.AUTHENTICATION_REQUEST_PENDING, authenticationWorker),
  ])
}