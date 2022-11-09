import React, { Component } from 'react'
import './index.css'
export class TabControl extends Component {
    constructor() {
        super()
        this.state = {
            currentIndex: 0,
        }
    }
    tabClick(index){
        this.setState({currentIndex:index})
    }
  render() {
      const {titles} = this.props;
      const {currentIndex} = this.state
    return (
      <div className="tab-control">
          {titles.map((item, index) =><div key={item} className={`item ${currentIndex===index?'active':''}`} onClick={()=>this.tabClick(index)}><span className="text">{item}</span></div>)}

      </div>
    )
  }
}

export default TabControl