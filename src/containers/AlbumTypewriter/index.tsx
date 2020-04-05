import React, { memo, useState, useRef, useEffect } from 'react'
import AudioPlayer from '../../components/AudioPlayer'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AssetsLoader, { AssetType } from '../../components/AssetsLoader'
import audio from '@/assets/audios/1.mp3'
import Stage from '../../../src/containers/AlbumTypewriter/Stage'
import images from './images'

const LoaderWrap = styled.div({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const assets = images.map(url => ({
  id: url,
  url,
  type: AssetType.IMAGE
}))

const audios = [audio]

/**
 * 1. typewriter
 * 2. fly photo
 * 3. music
 */
const AlbumTypewriter = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [isStageReady, setIsStageReady] = useState(false)
  const playerRef = useRef()
  const isUserTouched = useSelector(state => state.global.isUserTouched)

  const onLoad = () => setIsLoaded(true)

  const onStart = () => setIsStageReady(true)
  const onCanPlay = () => setIsAudioReady(true)

  useEffect(() => {
    if (isAudioReady && isStageReady) {
      setTimeout(() => {
        playerRef.current.play()
      }, 200)
    }
  }, [isAudioReady, isStageReady])

  return (
    <>
      <AudioPlayer
        audios={audios}
        isUserTouched={isUserTouched}
        autoPlay={false}
        onCanPlay={onCanPlay}
        ref={playerRef}
      />

      {
        isLoaded
        ? (
          <Stage images={assets.map(item => item.url)} onStart={onStart} />
        )
        : (
          <LoaderWrap>
            <AssetsLoader assets={assets} onLoad={onLoad} />
          </LoaderWrap>
        )
      }
    </>
  )
}

export default memo(AlbumTypewriter)
