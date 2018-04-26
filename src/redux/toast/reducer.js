import {SHOW_TOAST_MESSAGE} from './constants'
const initialState = {
  message: null
}
export default (state = initialState, actions) => {
  const {type, message} = actions
  switch (type) {
    case SHOW_TOAST_MESSAGE:
      return {
        ...state,
        message
      }
    default:
      return state
  }
}