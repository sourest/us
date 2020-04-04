import { createStore, combineReducers } from 'redux'
import global from './global'
import user from './user'

const store = createStore(
  combineReducers({
    global,
    user,
  }),
  {}
)

export default store
