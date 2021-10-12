import Form, { FormItem } from './form'
import InputForm from './input'
import SelectForm from './select'
import SwitchForm from './switch'
import CheckForm from './check'
import SteepForm from './steep'
import SliderForm from './slider'
import RateForm from './rate'
import DateForm from './date'
import TimeForm from './time'
import ColorForm from './color'
import UploadForm from './upload'
import ObjectForm from './object'
import ArrayForm from './array'
import ArrayOneForm from './array_one'
import { ArrayTwo, ArrayTowItem } from './array_two'
import ButtonForm from './button'

export default {
  form: Form,
  'form-item': FormItem,
  input: InputForm,
  select: SelectForm,
  switch: SwitchForm,
  check: CheckForm,
  steep: SteepForm,
  slider: SliderForm,
  rate: RateForm,
  date: DateForm,
  time: TimeForm,
  color: ColorForm,
  upload: UploadForm,
  object: ObjectForm,
  array: ArrayForm,
  'array-one': ArrayOneForm,
  'array-two': ArrayTwo,
  'array-two-item': ArrayTowItem,
  button: ButtonForm
}
