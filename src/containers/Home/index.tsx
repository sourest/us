import React, { memo } from 'react'
import Hello from '../../components/Hello'


const Home = () => {
  return (
    <div>
      <Hello />
    </div>
  )
}

export default memo(Home)