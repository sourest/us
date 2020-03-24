import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      home
    </div>
  )
}

const router = (
  <HashRouter>
    <Route path="/" component={Home} />
  </HashRouter>
)

export default router