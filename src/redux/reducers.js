import {combineReducers} from 'redux'
import toast from './toast/reducer'
import {authentication} from './authentication/reducer'
import {queueList} from './queue/reducer'
import notificationMessage from './notification-top/reducer'
export default combineReducers({
  toast,
  queueList,
  notificationMessage,
  authentication
})
