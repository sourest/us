import { createStore, combineReducers } from 'redux'
import user from './user'

const store = createStore(
  combineReducers({
    user
  }),
  {}
)

export default store
