import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import 'preset-style/dist/index.css'
import 'style.css'

const root = document.createElement('div')

ReactDom.render(<App />, root)

document.body.appendChild(root)
