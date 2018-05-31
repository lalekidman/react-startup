import * as types from './constants'

export const authenticateUser = (data) => ({
  type: types.AUTHENTICATION_REQUEST_PENDING,
  data
})
export const authenticateUserFailed = (error) => ({
  type: types.AUTHENTICATION_REQUEST_FAILED,
  error
})
export const authenticatedUser = (data) => ({
  type: types.AUTHENTICATION_REQUEST_SUCCESS,
  data
})
export const updateAuthenticatedUserData = (data) => ({
  type: types.AUTHENTICATION_REQUEST_SUCCESS,
  data
})
export const checkAuthenticationUser = () => ({
  type: types.CHECK_USER_AUTHENTICATION
})