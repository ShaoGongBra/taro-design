import React from 'react'
import { Image } from '@tarojs/components'
import { filterProps } from '../../render'
import './image.scss'

export default props => <Image
  {...filterProps(props)}
  webp
  showMenuByLongpress
/>
