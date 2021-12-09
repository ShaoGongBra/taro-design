import { Component } from 'react'
import ComponentItem from './ComponentItem'

class Create extends Component {

  shouldComponentUpdate(nextProps) {
    const { nodes } = this.props
    if (nextProps.nodes === nodes && nextProps.nodes.length === nodes.length) {
      const mark = nextProps.nodes.map(item => item.key + '-' + (item.hidden ? '1' : '0')).join('|')
      if (this.mark === mark) {
        return false
      }
      this.mark = mark
    }
    return true
  }

  render() {
    const { nodes = [], parentNode } = this.props
    return nodes.map((item, index) => <ComponentItem
      key={item.key}
      index={index}
      attr={item}
      parentNode={parentNode}
    />)
  }
}

export default Create
