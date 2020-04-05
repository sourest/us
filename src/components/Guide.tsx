import React, { memo, useEffect, useRef, useState } from 'react'
import styled, { CSSObject, keyframes, css } from 'styled-components'

const Wrap = styled.div({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
})

const enterKeyframes = keyframes`0%{opacity:0;}100%{opacity:1;}`
const GuideItemBlock = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'fixed',
  boxShadow: '0 0 0 100vmax rgba(0,0,0,0.8)',
  color: '#fff',
  fontSize: 16,
  animation: `${enterKeyframes.getName()} 1s`
}, css`${enterKeyframes}`)

const Tip = styled.div({

})

type GuideItemProps = {
  tip?: string
  tipStyle?: CSSObject
  [key: string]: any
}
const GuideItem = ({ tip, tipStyle = {}, ...rest }: GuideItemProps) => {

  const blockRef = useRef()

  useEffect(() => {
    console.log(blockRef)
  }, [])

  return (
    <GuideItemBlock {...rest} ref={blockRef}>
      <Tip style={tipStyle}>{tip}</Tip>
    </GuideItemBlock>
  )
}

type GuideProps = {
  visible?: boolean,
  onOver: () => void
}
const Guide = ({
  visible,
  onOver
}: GuideProps) => {

  const [step, setStep] = useState(0)

  const onTapWrap = () => {
    if (step === 3) {
      onOver()
    } else {
      setStep(step + 1)
    }
  }

  useEffect(() => {
    if (visible) {
      setStep(1)
    } 
  }, [visible])
  
  return (
    visible && <Wrap onClick={onTapWrap}>
      {
        step === 1 && (
          <GuideItem
            tip="这是绳结，可以拉动打开导航菜单哟"
            style={{top: 0,right: 10,width: 50,height: 90}}
            tipStyle={{
              position: 'absolute',
              right: 'calc(100% + 10px)',
              top: '50%',
              width: 270,
              textAlign: 'right'
            }}
          />
        )
      }
      {
        step === 2 && (
          <GuideItem
            style={{top: 0,left: 0,width: 60,height: 60}}
            tip="这是会有播放器，可以放音乐哟"
            tipStyle={{
              position: 'absolute',
              left: 'calc(100% + 10px)',
              top: '50%',
              width: 270,
            }}
          />
        )
      }
      {
        step === 3 && (
          <GuideItem
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              boxShadow: '0 0 0 100vmax rgba(0,0,0,0.8) inset',
            }}
            tip="接下来，就交给你去发现了"
          />
        )
      }
    </Wrap>
  )
}

export default memo(Guide)