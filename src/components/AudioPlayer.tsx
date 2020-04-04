import React, { useRef, useState, useEffect, useCallback } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { layoutZIndex } from '../constants'

const Wrap = styled.div<{ canPlay: boolean }>(({ canPlay }) => ({
  position: 'fixed',
  zIndex: layoutZIndex.FIXED + 1e2,
  top: 10,
  left: 10,
  width: 40,
  height: 40,
  borderRadius: 40,
  overflow: 'hidden',
  boxShadow: '0 0 5px 1px rgba(0,0,0,0.3)',
  cursor: 'pointer',
  display: 'flex',
  transition: '1s',
  transform: `translate3d(${canPlay ? 0 : -40}px,0,0)`,
  justifyContent: 'center',
  alignItems: 'center'
}))

const rotateKeyframes = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})
const Icon = styled.svg.attrs({
  viewBox: '0 0 1024 1024',
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  children: <path d="M512 128v450.133333A170.666667 170.666667 0 1 0 597.333333 725.333333V298.666667h170.666667V128z" />
})<{ playing: boolean }>(({ playing }) => ({
  animation: `${rotateKeyframes.getName()} 2s linear infinite`,
  width: '100%',
  animationPlayState: playing ? 'running' : 'paused'
}), css`${rotateKeyframes}`)

type AudioPlayerProps = {
  audios?: string[] | string
  isUserTouched?: boolean
  autoPlay?: boolean
  loop?: boolean
}
const AudioPlayer = ({
  audios = [],
  isUserTouched,
  autoPlay,
  loop
}: AudioPlayerProps) => {
  const [isCanPlay, setIsCanPlay] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>()

  if (typeof audios === 'string') {
    audios = [audios]
  }

  const onTap = () => {
    if (isCanPlay) {
      const audioElement = audioRef.current
      if (audioElement.paused) {
        audioElement.play()
      } else {
        audioElement.pause()
      }
    }
  }

  const onCanPlay = () => setIsCanPlay(true)
  const onPlay = () => setIsPlaying(true)
  const onPause = () => setIsPlaying(false)

  const removeEvents = () => {
    window.removeEventListener('touchstart', onUserTouched)
  }

  const onUserTouched = useCallback(() => {
    removeEvents()
    audioRef.current.play().then(() => {
      if (!autoPlay) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    })
  }, [])

  useEffect(() => {
    if (isUserTouched) {
      onUserTouched()
    } else {
      window.addEventListener('touchstart', onUserTouched)
    }

    return () => {
      removeEvents()
    }
  }, [])

  return (
    <Wrap onClick={onTap} canPlay={isCanPlay}>
      <audio
        hidden
        ref={audioRef}
        loop={loop}
        autoPlay={autoPlay}
        onCanPlay={onCanPlay}
        onPlaying={onPlay}
        onPause={onPause}
      >
        {
          audios.map((src) => (
            <source src={src} key={src} />
          ))
        }
      </audio>

      <Icon playing={isPlaying} />
    </Wrap>
  )
}

export default AudioPlayer
