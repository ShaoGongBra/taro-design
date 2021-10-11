import React from 'react'
import { Text } from '@tarojs/components'
import { filterProps } from '../../render'
import './text.scss'

export default ({ text, ...props }) => <Text {...filterProps(props)}>{text}</Text>
