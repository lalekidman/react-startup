import {SHOW_TOAST_MESSAGE} from './constants'
export const showToastMessage = (message) => {
  return {
    type: SHOW_TOAST_MESSAGE,
    message
  }
}