import * as types from './constants'
let initialState = {
  status: null,
  data: null,
  error: null,
  retry: 0
}

export const authentication = (state = initialState, action) => {
  const {data, error, type} = action
  switch(type) {
    case types.AUTHENTICATION_REQUEST_PENDING:
      return {
        ...state,
        status: 'FETCHING',
        data: null,
        error: null,
        retry: (state.retry + 1)
      }
    case types.AUTHENTICATION_REQUEST_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        error: null,
        data
      }
    case types.AUTHENTICATION_REQUEST_FAILED:
      return {
        ...state,
        status: 'FAILED',
        data: null,
        error
      }
    case types.CHECK_USER_AUTHENTICATION:
      return {
        ...state,
        status: 'CHECKING',
        data: null,
      }
    case types.UNVERIFY_AUTHENTICATION:
      return {
        ...state,
        status: 'UNVEFIRY',
        data: null,
      }
    case types.LOGOUT_AUTHENTICATION:
      return initialState
    default:
      return state
  }
}