import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Home from '../containers/Home'
// const Home = () => import('../containers/Home')

const router = (
  <HashRouter>
    <Route path="/" component={Home} />
  </HashRouter>
)

export default router