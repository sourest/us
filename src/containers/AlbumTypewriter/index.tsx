import React, { memo } from 'react'
import AudioPlayer from '../../components/AudioPlayer'
import audio from '../../assets/audios/1.mp3'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const audios = [audio]

/**
 * 1. typewriter
 * 2. fly photo
 * 3. music
 */
const AlbumTypewriter = (props) => {
  const isUserTouched = useSelector(state => state.global.isUserTouched)

  return (
    <>
      <AudioPlayer audios={audios} isUserTouched={isUserTouched}/>
      MusicPlayer
      Menu
      <Link to="/">Back</Link>
    </>
  )
}

export default AlbumTypewriter
