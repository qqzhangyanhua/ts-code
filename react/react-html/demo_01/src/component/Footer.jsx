import React, { Component } from 'react'
import TabControl from './TabControl'
export class Footer extends Component {
  constructor(){
    super();
    this.state = {
      titles:['流行','新款','精选']
    }
  }
  render() {
    return (
      <div>Footer
        <TabControl titles={this.state.titles}/>
      </div>
    )
  }
}

export default Footer