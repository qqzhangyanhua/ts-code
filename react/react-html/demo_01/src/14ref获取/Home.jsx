import React, { Component } from 'react'

export class Home extends Component {
test(){
    console.log('子组件的方法==');
}
  render() {
    return (
      <div>Home</div>
    )
  }
}

export default Home