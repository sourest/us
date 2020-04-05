import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import Guide from '../../components/Guide'
import { useSelector, useDispatch } from 'react-redux'

const Wrap = styled.div({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
})

const Title = styled.div({
  fontSize: 22,
  lineHeight: 1.5,
})

const Tip = styled.div({
  fontSize: 16,
  lineHeight: 1.4,
})

const Home = () => {

  const [titleLength, setTitleLength] = useState(0)
  const [tipLength, setTipLength] = useState(0)
  const [isShowGuide, setIsShowGuide] = useState(false)
  const dispatch = useDispatch()
  const isReadGuide = useSelector(state => state.user.isReadGuide)

  const fullTitle = '这是关于我们的故事'
  const fullTip = 'These are stories about us'

  const start = () => {
    setTitleLength(1)
    setTipLength(0)
  }

  useEffect(() => {
    if (!titleLength) {
      start()
    } else {
      setTimeout(() => {
        if (titleLength < fullTitle.length) {
          setTitleLength(titleLength + 1)
        } else if (tipLength < fullTip.length) {
          setTipLength(tipLength + 1)
        } else if (!isReadGuide) {
          setTimeout(() => {
            setIsShowGuide(true)
          }, 200)
        }
      }, 150)
    }
  }, [titleLength, tipLength])

  const onGuideOver = () => {
    dispatch({
      model: 'USER',
      type: 'USER_GUIDE_READ',
    })
    setIsShowGuide(false)
  }

  return (
    <Wrap>
      <Title>{fullTitle.slice(0, titleLength)}</Title>
      <Tip>{fullTip.slice(0, tipLength)}</Tip>
      <Guide visible={isShowGuide} onOver={onGuideOver} />
    </Wrap>
  )
}

export default memo(Home)