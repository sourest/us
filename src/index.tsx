import React from 'react'
import ReactDom from 'react-dom'
import store from './store'
import App from './App'
import * as globalModel from './store/global'
import 'preset-style/dist/index.css'
import 'style.css'

const root = document.createElement('div')

ReactDom.render(<App store={store} />, root)

document.body.appendChild(root)

const onWindowTouch = () => {
  store.dispatch({
    model: globalModel.MODEL_NAME,
    type: globalModel.types.SET_USER_TOUCH
  })
  window.removeEventListener('touchstart', onWindowTouch)
}

window.addEventListener('touchstart', onWindowTouch)