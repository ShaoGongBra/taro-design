import Image from './image'
import Text from './text'
import Icon from './icon'
import Button from './button'
import Video from './video'
import View from './view'
import Loading from './loading'
import ScrollView from './scroll_view'
import KeyboardAvoiding from './keyboard_avoiding'
import { SwiperLayout, SwiperItemLayout } from './swiper'
import { Calendar, CalendarSelect } from './calendar'

export default {
  view: View,
  text: Text,
  image: Image,
  icon: Icon,
  video: Video,
  swiper: SwiperLayout,
  'swiper-item': SwiperItemLayout,
  loading: Loading
}

export {
  Icon,
  Button,
  Loading,
  ScrollView,
  KeyboardAvoiding,
  Calendar,
  CalendarSelect
}
