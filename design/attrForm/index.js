import { defineComponents } from '../../render'

import Style from './style'
import Item from './common/item'
import Group from './common/group'
import { Tab } from './common/tab'
import Input from './common/input'
import Switch from './common/switch'
import IconSelect from './common/iconSelect'

const comps = {
  'edit-style': Style,
  'edit-input': Input,
  'edit-item': Item,
  'edit-group': Group,
  'edit-switch': Switch,
  'edit-tab': Tab,
  'edit-icon': IconSelect
}

defineComponents(comps)
