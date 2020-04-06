import React from 'react'
import { HashRouter, Route, Switch as Routes } from 'react-router-dom'
import styled from 'styled-components'
import Loadable from 'react-loadable'
import Menu from '../components/Menu'

const CubeAlbum = Loadable({
  loader: () => import('../containers/CubeAlbum'),
  loading: () => <div>loading</div>
})
const AlbumTypewriter = Loadable({
  loader: () => import('../containers/AlbumTypewriter'),
  loading: () => <div>loading</div>
})
const Home = Loadable({
  loader: () => import('../containers/Home'),
  loading: () => <div>loading</div>
})


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