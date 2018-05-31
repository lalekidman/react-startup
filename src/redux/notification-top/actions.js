import {SHOW_NOTIFICATION_TOP_MESSAGE} from './constants'
export const showNotificationMessage = (message, mode) => {
  return {
    type: SHOW_NOTIFICATION_TOP_MESSAGE,
    message,
    mode
  }
}