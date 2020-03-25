import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Menu from '../components/Menu'
import Home from '../containers/Home'
// const Home = () => import('../containers/Home')

const router = (
  <HashRouter>
    <div>
      <Menu />
      <Route path="/" component={Home} />
    </div>
  </HashRouter>
)

export default router