import React from 'react'
import { Video } from '@tarojs/components'
import { filterProps } from '../../render'
import './video.scss'

export default props => <Video {...filterProps(props)} />
