import React, { PureComponent } from 'react'
import styled, { keyframes, css } from 'styled-components'
import AudioPlayer from '../../components/AudioPlayer'
import audio from '@/assets/audios/1.mp3'

import i1 from '../../assets/images/1.jpg'
import i2 from '../../assets/images/2.jpg'
import i3 from '../../assets/images/3.jpg'
import i4 from '../../assets/images/4.jpg'
import i5 from '../../assets/images/5.jpg'
import i6 from '../../assets/images/6.jpg'
import i7 from '../../assets/images/7.jpg'
import i8 from '../../assets/images/8.jpg'
import i9 from '../../assets/images/9.jpg'
import i10 from '../../assets/images/10.jpg'
import i11 from '../../assets/images/11.jpg'
import i12 from '../../assets/images/12.jpg'
import { connect } from 'react-redux'

const BOX_SIZE = 160
const audios = [audio]

enum BoxFaces {
  FROUNT = 0,
  TOP = 1,
  BACK = 2,
  BOTTOM = 3,
  LEFT = 4,
  RIGHT = 5,
}

enum BoxSizes {
  SMALL = BOX_SIZE / 2,
  BIG = BOX_SIZE,
}

const Wrap = styled.div({
  height: '100vh',
  background: '#000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  touchAction: 'none'
})

type BoxRotorProps = {
  rotateX: number
  rotateY: number
}
const BoxRotor = styled.div.attrs(({ rotateX, rotateY }: BoxRotorProps) => ({
  style: {
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
}))<BoxRotorProps>({
  transformStyle: 'preserve-3d',
  cursor: 'grabbing'
})

const rotateKeyframes = keyframes`from{}to{transform: rotateX(360deg) rotateY(360deg);}`
type BoxProps = { isDraging: boolean }
const Box = styled.div<BoxProps>(({ isDraging }: BoxProps) => ({
  animation: `${rotateKeyframes.getName()} 20s infinite`,
  transformStyle: 'preserve-3d',
  width: BOX_SIZE,
  height: BOX_SIZE,
  animationPlayState: isDraging ? 'paused' : 'running',
}), css`${rotateKeyframes}`)

const onDragStartCapture = event => event.preventDefault()
type BoxFacesProps = { face: BoxFaces, size: BoxSizes }
const InnerFace = styled.img.attrs(({ face, size }: BoxFacesProps) => ({
  alt: '',
  onDragStartCapture
}))<BoxFacesProps>(({ face, size }) => ({
  position: 'absolute',
  objectFit: 'cover',
  transition: 'all .7s',
  opacity: size === BoxSizes.BIG ? .9 : 1,
  top: (BOX_SIZE - size) / 2,
  left: (BOX_SIZE - size) / 2,
  width: size,
  height: size,
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  transform: `rotate${face > BoxFaces.BOTTOM ? `Y(${face * 180 + 90}` : `X(${face * 90}`}deg) translateZ(${size / 2}px)`,
}), css`
  ${Box}:hover & {
    transform: ${({ face, size }: BoxFacesProps) => `rotate${face > BoxFaces.BOTTOM ? `Y(${face * 180 + 90}` : `X(${face * 90}`}deg) translateZ(${size === BoxSizes.BIG ? size : (size / 2)}px)`}
  }
`)


const faceList = [
  { size: BoxSizes.BIG, face: BoxFaces.FROUNT, src: i1 },
  { size: BoxSizes.BIG, face: BoxFaces.TOP, src: i2 },
  { size: BoxSizes.BIG, face: BoxFaces.BACK, src: i3 },
  { size: BoxSizes.BIG, face: BoxFaces.BOTTOM, src: i4 },
  { size: BoxSizes.BIG, face: BoxFaces.LEFT, src: i5 },
  { size: BoxSizes.BIG, face: BoxFaces.RIGHT, src: i6 },
  { size: BoxSizes.SMALL, face: BoxFaces.FROUNT, src: i7 },
  { size: BoxSizes.SMALL, face: BoxFaces.TOP, src: i8 },
  { size: BoxSizes.SMALL, face: BoxFaces.BACK, src: i9 },
  { size: BoxSizes.SMALL, face: BoxFaces.BOTTOM, src: i10 },
  { size: BoxSizes.SMALL, face: BoxFaces.LEFT, src: i11 },
  { size: BoxSizes.SMALL, face: BoxFaces.RIGHT, src: i12 },
].map(({ src }, index) => (
  <InnerFace
    size={index > BoxFaces.RIGHT ? BoxSizes.BIG : BoxSizes.SMALL}
    face={index > BoxFaces.RIGHT ? (index - 6) : index}
    src={src}
    key={src}
  />
))

export type CubeAlbumProps = {
  isUserTouched: boolean
}
type CubeAlbumState = {
  isDraging: boolean
  rotateX: number
  rotateY: number
  rotateStartX: number
  rotateStartY: number
  dragStartX: number
  dragStartY: number
}
class CubeAlbum extends PureComponent<CubeAlbumProps, CubeAlbumState> {
  constructor (props) {
    super(props)

    this.state = {
      isDraging: false,
      rotateX: 0,
      rotateY: 0,
      rotateStartX: 0,
      rotateStartY: 0,
      dragStartX: 0,
      dragStartY: 0,
    }

    this.onDragStart = this.onDragStart.bind(this)
    this.onDraging = this.onDraging.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  componentWillUnmount () {
    this.onDragEnd()
  }

  onDragStart (event: React.TouchEvent | React.MouseEvent) {
    const { onDraging, onDragEnd, state: { rotateX, rotateY } } = this

    let dragStartX, dragStartY

    if (event.type === 'touchstart') {
      dragStartX = (event as React.TouchEvent).touches[0].screenX
      dragStartY = (event as React.TouchEvent).touches[0].screenY
      window.addEventListener('touchmove', onDraging, { passive: false })
      window.addEventListener('touchend', onDragEnd)
      window.addEventListener('touchcancel', onDragEnd)
    } else {
      dragStartX = (event as React.MouseEvent).clientX
      dragStartY = (event as React.MouseEvent).clientY
      window.addEventListener('mousemove', onDraging, { passive: false })
      window.addEventListener('mouseup', onDragEnd)
    }
    this.setState({
      isDraging: true,
      rotateStartX: rotateX,
      rotateStartY: rotateY,
      dragStartX,
      dragStartY
    })
  }

  onDraging (event: MouseEvent | TouchEvent) {
    event.preventDefault()
    const { dragStartX, dragStartY, rotateStartX, rotateStartY } = this.state
    const dragMoveX = (event instanceof MouseEvent ? event.clientX : event.touches[0].screenX) - dragStartX
    const dragMoveY = (event instanceof MouseEvent ? event.clientY : event.touches[0].screenY) - dragStartY

    this.setState({
      rotateX: +(rotateStartX - dragMoveY / 2).toFixed(4),
      rotateY: +(rotateStartY + dragMoveX / 2).toFixed(4),
    })
  }

  onDragEnd () {
    const { onDraging, onDragEnd } = this
    window.removeEventListener('touchmove', onDraging)
    window.removeEventListener('touchup', onDragEnd)
    window.removeEventListener('mousemove', onDraging)
    window.removeEventListener('mouseup', onDragEnd)
    window.removeEventListener('touchcancel', onDragEnd)
    this.setState({
      isDraging: false
    })
  }

  render () {
    const { props: { isUserTouched }, state: { rotateX, rotateY, isDraging }, onDragStart } = this

    const boxRotorProps = {
      rotateX,
      rotateY,
      onTouchStart: onDragStart,
      onMouseDown: onDragStart,
    }

    return (
      <Wrap>
        <AudioPlayer
          audios={audios}
          isUserTouched={isUserTouched}
        />
        <BoxRotor {...boxRotorProps}>
          <Box isDraging={isDraging}>
            {faceList}
          </Box>
        </BoxRotor>
      </Wrap>
    )
  }
}

export default connect(state => ({ isUserTouched: state.global.isUserTouched }))(CubeAlbum)
