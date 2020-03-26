import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Menu from '../components/Menu'
import Home from '../containers/Home'
import AlbumTypewriter from '../containers/AlbumTypewriter'
// const Home = () => import('../containers/Home')


const router = (
  <HashRouter>
    <div className="33">
      <Menu />
      <Route path="/" component={Home} />
      <Route path="/album-typewriter" component={AlbumTypewriter} />
    </div>
  </HashRouter>
)

export default router