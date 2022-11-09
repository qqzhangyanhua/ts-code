import React, { Component } from 'react'
import './style.css'
export class NavBar extends Component {
  render() {
    const {centerSlot , leftSlots } = this.props
        //c插槽
    return (
      <div className="nav-bar">
          <div className="left">{leftSlots('按钮')}</div>
          <div className="center">{centerSlot}</div>
          <div className="right">right</div>
      </div>
    )
  }
}

export default NavBar