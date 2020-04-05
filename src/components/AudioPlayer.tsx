import React, { useRef, useState, useEffect, useCallback, memo, forwardRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { layoutZIndex } from '../constants'

const noop = () => {}

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
  children: <path d="M512 128v450.133333A170.666667 170.666667 0 1 0 597.333333 725.333333V298.666667h170.666667V128z" />,
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
  onCanPlay?: () => void
}
const AudioPlayer = ({
  audios = [],
  isUserTouched,
  autoPlay = true,
  loop = true,
  onCanPlay = noop
}: AudioPlayerProps, ref) => {
  const [isCanPlay, setIsCanPlay] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>()

  if (ref) {
    ref.current = {
      isCanPlay,
      isPlaying,
      audioRef,
      play () {
        if (audioRef.current) {
          audioRef.current.play()
        }
      },
      pause () {
        if (audioRef.current) {
          audioRef.current.pause()
        }
      }
    }
  }

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

  const onCanPlayLocal = () => {
    setIsCanPlay(true)
    onCanPlay()
  }
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
  }, [isUserTouched])

  return (
    <Wrap className="no-tap-highlight" onClick={onTap} canPlay={isCanPlay}>
      <audio
        hidden
        ref={audioRef}
        autoPlay={autoPlay}
        loop={loop}
        onCanPlay={onCanPlayLocal}
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

export default memo(forwardRef(AudioPlayer))
