
import React, { Component } from 'react'
 import loginRenderer from './log-render'
export class List extends Component {
  render() {
    return (
      <div>
          {[1,2,3,4,5,6,7,8,9].map(item =><span key={item}>{item}</span>)}
      </div>
    )
  }
}

export default loginRenderer(List)