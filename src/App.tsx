import React from 'react'
import { Provider } from 'react-redux'
import router from './router'

const App = ({ store }) => {
  return (
    <Provider store={store}>
      {router}
    </Provider>
  )
}

export default App
