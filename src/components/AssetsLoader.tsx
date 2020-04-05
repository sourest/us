import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components'

const Wrap = styled.div({
  fontSize: 18,
  textAlign: 'center',
})

enum AssetsLoadStatus {
  UNSTART = 'UNSTART',
  START = 'START',
  LOADING = 'LOADING',
  OVER = 'OVER',
  FAIL = 'FAIL',
}

const assetsLoadStatusText = {
  [AssetsLoadStatus.UNSTART]: '未开始',
  [AssetsLoadStatus.START]: '已开始',
  [AssetsLoadStatus.LOADING]: '加载中',
  [AssetsLoadStatus.OVER]: '已完成',
  [AssetsLoadStatus.FAIL]: '失败',
}

export enum AssetType {
  IMAGE = 'IMAGE',
  // TEXT = 'TEXT',
  // SCRIPT = 'SCRIPT',
}
export enum AssetStatus {
  UNSTART = 'UNSTART',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  FAIL = 'FAIL',
}
export type AssetsItem<AssetType = AssetType.IMAGE> = {
  id?: string | number
  url: string
  type: AssetType
  status?: AssetStatus
  necessary?: boolean
}

const loadImages = (images: AssetsItem<AssetType.IMAGE>[], callback: (image: AssetsItem<AssetType.IMAGE>) => any ) => {
  return images.map(image => {
    const img = new Image()
    img.onload = () => {
      image.status = AssetStatus.LOADED
      callback(image)
    }
    img.onerror = () => {
      image.status = AssetStatus.FAIL
      callback(image)
    }
    image.status = AssetStatus.LOADING
    img.src = image.url
    return image
  });
}

const loadAssets = (assetList: AssetsItem[], callback) => {
  const images = assetList.filter(item => item.type === AssetType.IMAGE)
  loadImages(images, callback)
}


type AssetsLoaderProps = {
  assets: AssetsItem[]
  onLoad: () => void
}
const AssetsLoader = ({ assets, onLoad }: AssetsLoaderProps) => {
  const [status, setStatus] = useState(AssetsLoadStatus.UNSTART)
  const [loadAmount, setLoadAmount] = useState(0)
  
  const total = assets.length

  useEffect(() => {
    const allAsseets = assets.map(item => ({...item}))
    if (status === AssetsLoadStatus.UNSTART) {
      setStatus(AssetsLoadStatus.LOADING)

      loadAssets(allAsseets, (item: AssetsItem) => {
        const { LOADED, FAIL } = AssetStatus
        if (item.status === LOADED) {
          setLoadAmount(allAsseets.reduce((sum, item) => (item.status === LOADED ? (sum + 1) : sum), 0))
        }
        if (allAsseets.every(item => [LOADED, FAIL].includes(item.status))) {
          if (allAsseets.some(item => item.necessary && item.status === FAIL)) {
            setStatus(AssetsLoadStatus.FAIL)
          } else {
            setStatus(AssetsLoadStatus.OVER)
            onLoad()
          }
        }
      })
    }
  }, [assets])

  return (
    <Wrap>
      {assetsLoadStatusText[status]} {(loadAmount / total * 100).toFixed(2)}%
    </Wrap>
  )
}

export default memo(AssetsLoader)
