import {all} from 'redux-saga/effects'
import AuthenticationSaga from './authentication/saga'
export default function * () {
  yield all([
    AuthenticationSaga()
  ])
}
