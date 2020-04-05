import React from 'react'
import { HashRouter, Route, Switch as Routes } from 'react-router-dom'
import styled from 'styled-components'
import Menu from '../components/Menu'
import Home from '../containers/Home'
import AlbumTypewriter from '../containers/AlbumTypewriter'
import CubeAlbum from '../containers/CubeAlbum'
// const Home = () => import('../containers/Home')

const Wrap = styled.div({
  position: 'relative',
  userSelect: 'none',
})

const menus = [
  {
    id: 'goddess festival',
    name: '女神节快乐',
    path: '/typewriter-album'
  },
  {
    id: 'cube album',
    name: '上下左右前后都是你',
    path: '/cube-album'
  },
]

const router = (
  <Wrap>
    <HashRouter>
      <Menu menus={menus} />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/typewriter-album" component={AlbumTypewriter} />
        <Route path="/cube-album" component={CubeAlbum} />
      </Routes>
    </HashRouter>
  </Wrap>
)

export default router