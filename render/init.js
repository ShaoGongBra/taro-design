import comps from '../component/design'
import { defineComponents } from './ComponentItem'
import { defineIcon } from './util/icon'
import icon from './static/icon/icon'
import './static/icon/icon.css'

defineComponents(comps)
defineIcon('icon', icon)
