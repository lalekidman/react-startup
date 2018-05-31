import * as types from './constants'
const initialState = {
  status: null,
  error: null,
  data: [],
  retry: 0
}

export const queueList = (state = initialState, {type, data, error}) => {
  switch (type) {
    case types.GET_QUEUE_LIST_FETCHING:
      return {
        ...state,
        type: 'FETCHING',
        error: null,
        data: []
      }
    case types.GET_QUEUE_LIST_FETCHED:
      return {
        ...state,
        type: 'FETCHED',
        data
      }
    case types.GET_QUEUE_LIST_FAILED:
      return {
        ...state,
        type: 'FAILED',
        error,
      }
    default:
      return state
  }
}