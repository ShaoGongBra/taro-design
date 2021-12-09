import { StatusBar } from 'react-native'

export default ({ barStyle }) => {

  // barStyle ['light-content', 'dark-content', 'default']
  return <StatusBar
    animated
    hidden={false}
    backgroundColor='transparent'
    translucent
    barStyle={barStyle}
  />
}
