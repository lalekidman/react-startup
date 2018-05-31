import {SHOW_NOTIFICATION_TOP_MESSAGE} from './constants'
const initialState = {
  message: null,
  mode: 1
}
export default (state = initialState, actions) => {
  const {type, message, mode = 1} = actions
  switch (type) {
    case SHOW_NOTIFICATION_TOP_MESSAGE:
      return {
        ...state,
        message,
        mode
      }
    default:
      return state
  }
}