import React, { memo, useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { layoutZIndex } from '../../../src/constants'
import i92 from '../../assets/images/92.jpg'

const text = decodeURI('%E5%A5%B3%E7%8E%8B%E5%A4%A7%E4%BA%BA%EF%BC%9A%0A%20%20%20%20%20%20%E6%88%91%E7%9A%84%E5%A5%B3%E7%8E%8B%E8%8A%82%E6%97%A5%E5%BF%AB%E4%B9%90%E5%93%9F%EF%BC%81%0A%20%20%20%20%20%20%E6%88%91%E4%BB%AC%E4%B8%80%E8%B5%B7%E7%BB%8F%E5%8E%86%E4%BA%86%E8%BF%99%E4%B9%88%E5%A4%9A%E9%A3%8E%E9%A3%8E%E9%9B%A8%E9%9B%A8%EF%BC%8C%E8%B5%B0%E5%88%B0%E4%BA%86%E4%BB%8A%E5%A4%A9%EF%BC%8C%E8%B0%A2%E8%B0%A2%E5%A6%B9%E5%A6%B9%E4%B8%80%E7%9B%B4%E9%99%AA%E7%9D%80%E6%88%91%EF%BC%81%0A%20%20%20%20%20%20%E8%AE%B0%E5%BE%97%E6%88%91%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%8B%89%E4%BD%A0%E7%9A%84%E5%B0%8F%E6%89%8B%E5%90%97%EF%BC%9F%E6%88%91%E5%AF%B9%E4%BD%A0%E8%AF%B4%E4%BD%A0%E6%8A%8A%E6%89%8B%E7%BB%99%E6%88%91%EF%BC%8C%E6%88%91%E6%9C%89%E4%B8%80%E4%B8%AA%E5%A5%BD%E4%B8%9C%E8%A5%BF%E7%BB%99%E4%BD%A0%EF%BC%8C%E7%84%B6%E5%90%8E%E4%BD%A0%E6%9E%9C%E7%9C%9F%E5%90%91%E6%88%91%E4%BC%B8%E5%87%BA%E4%BA%86%E5%B0%8F%E6%89%8B%EF%BC%8C%E7%84%B6%E5%90%8E%E6%88%91%E6%8A%8A%E6%88%91%E7%9A%84%E6%89%8B%E6%94%BE%E5%9C%A8%E4%BD%A0%E7%9A%84%E6%89%8B%E4%B8%8A%EF%BC%8C%E7%B4%A7%E7%B4%A7%E5%9C%B0%E6%8A%93%E4%BD%8F%E4%BD%A0%EF%BC%8C%E4%BD%A0%E7%AA%81%E7%84%B6%E5%BE%88%E5%BC%80%E5%BF%83%E7%9A%84%E7%AC%91%E4%BA%86%EF%BC%8C%E6%98%AF%E5%9B%A0%E4%B8%BA%E6%88%91%E7%9A%84%E5%B0%8F%E6%8A%8A%E6%88%8F%E5%91%A2%E8%BF%98%E6%98%AF%E5%9B%A0%E4%B8%BA%E5%BE%97%E5%88%B0%E6%88%91%E4%BA%86%E5%91%A2%EF%BC%8C%E7%84%B6%E5%90%8E%E4%B8%80%E8%B7%AF%E4%B8%8A%E5%B0%B1%E7%9C%8B%E8%A7%81%E4%BD%A0%E4%B8%8D%E5%81%9C%E5%9C%B0%E5%BC%80%E5%BF%83%E5%9C%B0%E7%AC%91%E5%91%80%E3%80%82%E4%BB%8E%E9%82%A3%E5%A4%A9%E5%BC%80%E5%A7%8B%EF%BC%8C%E6%88%91%E5%B0%B1%E6%83%B3%E4%B8%80%E8%BE%88%E5%AD%90%E9%83%BD%E8%BF%99%E6%A0%B7%E7%B4%A7%E7%B4%A7%E5%9C%B0%E6%8A%93%E4%BD%8F%E4%BA%86%E4%BD%A0%EF%BC%8C%E6%88%91%E4%B9%9F%E5%B8%8C%E6%9C%9B%E4%BD%A0%E4%B9%9F%E4%BC%9A%E8%BF%99%E6%A0%B7%E3%80%82%0A%20%20%20%20%20%20%E8%AE%B0%E5%BE%97%E6%88%91%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%8A%B1%E7%9D%80%E4%BD%A0%E5%90%97%EF%BC%9F%E6%88%91%E4%BB%AC%E5%B9%B6%E8%82%A9%E5%9D%90%E5%9C%A8%E8%A2%81%E5%AE%B6%E5%AF%A8%E5%87%A0%E7%99%BE%E9%98%B6%E6%A2%AF%E9%87%8C%E4%B8%80%E4%B8%AA%E5%B0%8F%E5%B9%B3%E5%8F%B0%E4%B8%8A%E7%9A%84%E5%A4%A7%E7%90%86%E7%9F%B3%E6%9D%BF%E5%87%B3%E4%B8%8A%EF%BC%8C%E6%98%AF%E5%9B%A0%E4%B8%BA%E4%BD%A0%E7%88%AC%E6%A2%AF%E7%88%AC%E7%B4%AF%E4%BA%86%E6%83%B3%E6%88%91%E9%99%AA%E4%BD%A0%E4%BC%91%E6%81%AF%E4%BC%91%E6%81%AF%EF%BC%8C%E8%BF%98%E6%98%AF%E6%83%B3%E6%88%91%E7%AD%89%E7%AD%89%E4%BD%A0%E5%A5%BD%E8%AE%A9%E6%88%91%E4%BB%AC%E5%9D%90%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%91%A2%EF%BC%9F%E6%88%91%E4%BC%B8%E6%89%8B%E6%8C%BD%E4%BD%8F%E4%BA%86%E4%BD%A0%EF%BC%8C%E6%8A%8A%E4%BD%A0%E5%9C%88%E5%9C%A8%E4%BA%86%E6%80%80%E9%87%8C%EF%BC%8C%E4%BD%A0%E4%B9%9F%E6%B2%A1%E6%9C%89%E4%BB%8B%E6%84%8F%EF%BC%8C%E5%83%8F%E6%98%AF%E4%B8%80%E5%8F%AA%E5%B0%8F%E7%8C%AB%E5%92%AA%EF%BC%8C%E4%B9%96%E5%B7%A7%EF%BC%8C%E5%AE%89%E9%9D%99%EF%BC%8C%E8%BD%AF%E8%BD%AF%E6%BB%B4%E3%80%82%E6%88%91%E4%B9%9F%E7%B4%A7%E5%BC%A0%E5%9C%B0%E6%90%82%E7%9D%80%E4%BD%A0%EF%BC%8C%E7%9C%8B%E7%9D%80%E4%BD%A0%EF%BC%8C%E5%B9%B8%E7%A6%8F%E5%9C%B0%E4%B8%8D%E8%83%BD%E8%87%AA%E5%B7%B2%E3%80%82%E4%BD%A0%E9%97%AE%E6%88%91%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E5%8F%91%E6%8A%96%EF%BC%8C%E6%98%AF%E5%9B%A0%E4%B8%BA%E5%A4%AA%E5%B9%B8%E7%A6%8F%E4%BA%86%E5%90%97%EF%BC%8C%E8%BF%98%E6%98%AF%E5%9B%A0%E4%B8%BA%E4%BD%A0%EF%BC%9F%0A%20%20%20%20%20%20%E8%AE%B0%E5%BE%97%E6%88%91%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%90%BB%E4%BD%A0%E5%90%97%EF%BC%9F%E4%BD%A0%E5%80%94%E5%BC%BA%E7%9C%B8%E5%AD%90%E9%87%8C%EF%BC%8C%E5%8D%B4%E5%83%8F%E6%98%AF%E5%92%8C%E6%88%91%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%86%8D%E6%B2%A1%E6%9C%89%E9%A1%BE%E8%99%91%E3%80%82%E4%BD%A0%E6%9C%89%E4%BD%A0%E7%9A%84%E5%B0%8F%E7%B4%A7%E5%BC%A0%EF%BC%8C%E5%BF%90%E5%BF%91%E4%B8%8D%E5%AE%89%E5%9C%B0%E6%9C%9B%E7%9D%80%E8%BF%9C%E6%96%B9%EF%BC%8C%E4%B9%9F%E6%9C%89%E5%AF%B9%E6%88%91%E7%9A%84%E4%B8%80%E7%82%B9%E7%82%B9%E4%BD%93%E8%B0%85%EF%BC%8C%E5%BF%8D%E4%B8%8D%E4%BD%8F%E5%9B%9E%E8%BF%87%E5%A4%B4%E6%9D%A5%E7%9C%8B%E7%9C%8B%E6%88%91%E3%80%82%0A%20%20%20%20%20%20%E7%9F%A5%E9%81%93%E4%BD%A0%E8%84%BE%E6%B0%94%E5%A4%A7%EF%BC%8C%E6%88%91%E9%83%BD%E8%AE%A9%E7%9D%80%E4%BD%A0%EF%BC%8C%E6%97%A0%E8%AE%BA%E5%AF%B9%E9%94%99%EF%BC%8C%E5%9B%A0%E4%B8%BA%E6%88%91%E7%9F%A5%E9%81%93%E5%92%8C%E4%BD%A0%E5%90%B5%E6%9E%B6%E6%97%A0%E8%AE%BA%E8%BE%93%E8%B5%A2%EF%BC%8C%E6%88%91%E9%83%BD%E6%98%AF%E5%A4%B1%E8%B4%A5%E7%9A%84%E3%80%82%E6%88%91%E7%9F%A5%E9%81%93%E6%88%91%E5%BA%94%E8%AF%A5%E9%80%89%E6%8B%A9%E7%BC%93%E5%92%8C%E7%9A%84%E6%B0%94%E6%B0%9B%E4%B8%8B%E6%9D%A5%E6%9F%94%E5%92%8C%E5%BD%93%E6%97%B6%E4%BD%A0%E7%9A%84%E8%AF%AD%E6%B0%94%E3%80%82%E5%9B%A0%E4%B8%BA%E6%88%91%E6%83%B3%E4%BD%A0%EF%BC%8C%E6%83%B3%E4%BD%A0%E5%BC%80%E5%BF%83%E6%89%80%E4%BB%A5%E6%88%91%E4%BC%9A%E8%AE%A9%E7%9D%80%E4%BD%A0%EF%BC%8C%E6%9A%96%E7%9D%80%E4%BD%A0%EF%BC%8C%E4%BB%BB%E5%B2%81%E6%9C%88%E4%BE%B5%E8%A2%AD%E3%80%82%0A%20%20%20%20%20%20%E8%AE%B0%E5%BE%97%E6%88%91%E6%9C%89%E4%B8%80%E6%AC%A1%E4%B8%8D%E5%BC%80%E5%BF%83%EF%BC%8C%E6%88%91%E8%99%BD%E7%84%B6%E5%91%8A%E8%AF%89%E4%BD%A0%E6%88%91%E6%B2%A1%E4%BA%8B%EF%BC%8C%E6%88%91%E4%BB%AC%E4%B9%9F%E4%B8%8D%E4%BC%9A%E6%9C%89%E4%BA%8B%E3%80%82%E5%8F%AF%E6%98%AF%E4%BD%A0%E5%8D%B4%E4%B8%80%E7%9B%B4%E4%B8%8D%E6%94%BE%E5%BF%83%EF%BC%8C%E7%A1%AC%E6%98%AF%E8%A6%81%E6%9D%A5%E6%88%90%E9%83%BD%E9%99%AA%E9%99%AA%E6%88%91%EF%BC%8C%E7%9C%8B%E7%9C%8B%E6%88%91%E3%80%82%E5%90%8E%E6%9D%A5%EF%BC%8C%E6%88%91%E7%9F%A5%E9%81%93%E4%BA%86%EF%BC%8C%E6%98%AF%E6%88%91%E4%B8%8D%E5%AF%B9%EF%BC%8C%E6%88%91%E6%B2%A1%E6%9C%89%E6%89%93%E6%B6%88%E4%BD%A0%E7%9A%84%E9%A1%BE%E8%99%91%EF%BC%8C%E8%AE%A9%E4%BD%A0%E4%B8%80%E4%B8%AA%E5%B0%8F%E5%A5%B3%E5%AD%90%E8%80%81%E6%98%AF%E5%8E%BB%E6%8B%85%E5%BF%83%EF%BC%8C%E5%AF%B9%E4%B8%8D%E8%B5%B7%EF%BC%8C%E5%A6%B9%E5%A6%B9%EF%BC%8C%E6%88%91%E4%BC%9A%E6%94%B9%E3%80%82%0A%20%20%20%20%20%20%E5%A6%B9%E5%A6%B9%EF%BC%8C%E6%97%A0%E8%AE%BA%E4%BB%A5%E5%90%8E%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%EF%BC%8C%E6%97%A0%E8%AE%BA%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%EF%BC%8C%E8%AF%B7%E4%BD%A0%E4%B8%80%E5%AE%9A%E8%A6%81%E7%9B%B8%E4%BF%A1%E6%88%91%EF%BC%8C%E7%9B%B8%E4%BF%A1%E6%88%91%E4%BB%AC%E3%80%82%E6%88%91%E4%BB%AC%E4%BC%9A%E5%9C%A8%E4%B8%80%E8%B5%B7%EF%BC%8C%E6%88%91%E4%BB%AC%E4%BC%9A%E5%A5%BD%E5%A5%BD%E7%9A%84%E3%80%82%E6%9C%89%E4%BB%80%E4%B9%88%E5%9B%B0%E9%9A%BE%E6%88%91%E4%BB%AC%E4%B8%80%E8%B5%B7%E9%9D%A2%E5%AF%B9%EF%BC%8C%E6%88%91%E4%BB%AC%E7%BB%8F%E5%8E%86%E4%BA%86%E8%BF%99%E4%B9%88%E5%A4%9A%E9%A3%8E%E9%A3%8E%E9%9B%A8%E9%9B%A8%EF%BC%8C%E8%AE%A9%E6%88%91%E4%BB%AC%E4%B9%9F%E8%B6%8A%E6%9D%A5%E8%B6%8A%E7%8F%8D%E6%83%9C%E5%BD%BC%E6%AD%A4%EF%BC%8C%E6%88%91%E7%9B%B8%E4%BF%A1%EF%BC%8C%E6%88%91%E4%BB%AC%E4%BC%9A%E5%B9%B8%E7%A6%8F%E8%BF%87%E5%A5%BD%E4%B8%80%E8%BE%88%E5%AD%90%E7%9A%84%E3%80%82%0A%20%20%20%20%20%20%E5%A6%B9%E5%A6%B9%EF%BC%8C%E6%88%91%E7%88%B1%E4%BD%A0%EF%BC%81%0A%20%20%20%20%20%20%E4%BD%A0%E7%9A%84%E5%93%A5%E5%93%A5%EF%BC%81%0A%0A')

const Wrap = styled.div({
  position: 'relative',
  zIndex: layoutZIndex.CONTENT,
  height: '100vh',
  background: `url(${i92}) no-repeat fixed right / cover`,
  overflow: 'hidden'
})

const Photos = styled.div({
  position: 'absolute',
  zIndex: 10,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

type PhotoProps = {
  fromX: number
  fromY: number
  toX: number
  toY: number
  rotate: number
  moved: boolean
}
const PhotoWrap = styled.div.attrs<PhotoProps>(({ fromX, fromY, toX, toY, rotate, moved }) => ({
  style: {
    transform: moved ? `translate3d(${toX}px, ${toY}px, 0) rotate(${rotate}deg)` : `translate3d(${fromX}px, ${fromY}px, 0) rotate(0)`,
    opacity: +moved,
  }
}))({
  position: 'absolute',
  transition: '3s',
  width: 0,
  height: 0
})
const Photo = styled.img.attrs({
  alt: '',
})({
  minWidth: 60,
  maxWidth: 120,
  boxShadow: '1px 1px 2px #666',
  borderRadius: 8,
  transform: 'translate3d(-50%, -50%, 0)'
})

const blinkKeyframes = keyframes`0%{opacity:0;}100%{opacity:1;}`
const Center = styled.div({
  position: 'absolute',
  zIndex: 30,
  top: '10%',
  left: '12%',
  right: '12%',
  bottom: '10%',
  background: 'rgba(255,255,255,.2)',
  wordBreak: 'break-all',
  whiteSpace: 'pre-wrap',
  fontSize: 18,
  lineHeight: 1.6,
  overflowY: 'scroll',
  WebkitOverflowScrolling: 'touch',
  boxSizing: 'border-box',
  borderRadius: 5,
  padding: 5,
  '&::after': {
    content: '""',
    display: 'inline-block',
    width: 1,
    height: 18 * 1.2,
    verticalAlign: 'top',
    marginLeft: 3,
    transform: 'translateY(2px)',
    background: '#111',
    animation: `${blinkKeyframes.getName()} 1s infinite`
  }
}, css`${blinkKeyframes}`)

const Door = styled.div<{ open: boolean }>(({ open }) => ({
  position: 'absolute',
  zIndex: open ? 0 : 40,
  opacity: open ? 0 : 1,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(255,255,255,.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  whiteSpace: 'pre-wrap',
  fontSize: 30,
  textAlign: 'center',
  lineHeight: 1.4,
  transition: 'all 2s',
}))


type StageProps = {
  images: string[],
  onStart: () => void
}
const Stage = ({ onStart, images }: StageProps) => {

  const [times, setTimes] = useState(0)
  const [photos, setPhotos] = useState([])
  const [article, setArticle] = useState('')

  const initPhotos = () => {
    const { innerWidth: stageWidth, innerHeight: stageHeight } = window
    const photoList = images.map(src => {
      const leftTop = 0
      const rightTop = 1
      const rightBottom = 2
      const leftBottom = 3

      const randomFrom = ~~(Math.random() * 4)
      const random2 = Math.random()
      const randomR = Math.random()

      const isTop = randomFrom < 2
      const isLeft = randomFrom === leftBottom || randomFrom === leftTop
      
      
      const item = {
        src,
        key: src,
        moved: false,
        fromX: isTop ? 0 : stageWidth,
        fromY: isLeft ? stageHeight : 0,
        rotate: (randomR + 1) * 360,
      }

      if (randomFrom === leftTop) {
        return {
          ...item,
          toX: (random2 * .8 + .2) * stageWidth,
          toY: (random2 * .2 + 0) * stageHeight,
        }
      } else if (randomFrom === rightTop) {
        return {
          ...item,
          toX: (random2 * .2 + .8) * stageWidth,
          toY: (random2 * .8 + .2) * stageHeight,
        }
      } else if (randomFrom === rightBottom) {
        return {
          ...item,
          toX: (random2 * .8 + 0) * stageWidth,
          toY: (random2 * .2 + .8) * stageHeight,
        }
      } else {
        return {
          ...item,
          toX: (random2 * .2 + 0) * stageWidth,
          toY: (random2 * .8 + 0) * stageHeight,
        }
      }
    })
    return photoList
  }
  

  const startFlyPhotos = () => {
    const photo = photos.find(item => !item.moved)
    if (photo) {
      photo.moved = true
      setTimeout(() => {
        setPhotos([...photos])
      }, 2e3)
    } else {
      setTimeout(() => {
        setTimes(times + 1)
      }, 2e3)
    }
  }

  useEffect(() => {
    if (photos.length !== 0) {
      startFlyPhotos()
    }
  }, [photos])

  useEffect(() => {
    if (times) {
      const photoList = initPhotos()
      setPhotos(photoList)
    }
  }, [times])

  useEffect(() => {
    setTimeout(() => {
      if (article !== text) {
        setArticle(article + (article ? text[article.length] : text[0]))
      }
    }, 300)
  }, [article])

  const onTapDoor = () => {
    onStart()
    setTimes(times + 1)
  }

  return (
    <Wrap>
      <Photos>
        {
          photos.map(({ src, ...photo}) => (
            <PhotoWrap {...photo}>
              <Photo src={src}/>
            </PhotoWrap>
          ))
        }
      </Photos>
      <Center>{article}</Center>
      <Door open={!!times} onTouchStart={onTapDoor}>
        {'我的女神\n女神节快乐哟'}
      </Door>
    </Wrap>
  )
}

export default memo(Stage)
