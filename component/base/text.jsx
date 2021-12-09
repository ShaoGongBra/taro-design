import { Text } from '@tarojs/components'
import classNames from 'classnames'
import { filterProps, styles } from '../../render'
import './text.scss'

export default ({ text, className, style, numberOfLines, ...props }) => {
  return <Text
    {...(numberOfLines ? { numberOfLines: Number(numberOfLines) } : {})}
    className={classNames(className, process.env.TARO_ENV === 'rn' ? '' : numberOfLines == 1 ? 'number-of-lines' : numberOfLines > 1 ? 'number-of-lines--more' : '')}
    style={styles(
      style,
      (process.env.TARO_ENV !== 'rn' && numberOfLines > 1 ? {
        '-webkit-line-clamp': numberOfLines
      } : {})
    )}
    {...filterProps(props)}
  >{text}</Text>
}
