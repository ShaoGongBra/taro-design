import React from 'react'
import { Swiper, SwiperItem } from '@tarojs/components'
import classNames from 'classnames'
import { filterProps } from '../../render'
import './swiper.scss'

const SwiperLayout = props => {
  return <Swiper {...filterProps(props)}>
    {props.children}
  </Swiper>
}

const SwiperItemLayout = ({ children, className, ...props }) => {
  return <SwiperItem
    className={classNames(className, 'form-swiper-item')}
    {...filterProps(props)}
  >
    {children}
  </SwiperItem>
}

export {
  SwiperLayout,
  SwiperItemLayout
}
