import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import styled from 'styled-components'
import Menu from '../components/Menu'
import Home from '../containers/Home'
import AlbumTypewriter from '../containers/AlbumTypewriter'
// const Home = () => import('../containers/Home')

const Wrap = styled.div({
  position: 'relative',
  userSelect: 'none',
})

const menus = [
  {
    name: '女神节快乐',
    path: '/album-typewriter'
  }
]

const router = (
  <Wrap>
    <HashRouter>
      <Menu menus={menus} />
      <Route path="/" component={Home} />
      <Route path="/album-typewriter" component={AlbumTypewriter} />
    </HashRouter>
  </Wrap>
)

export default router