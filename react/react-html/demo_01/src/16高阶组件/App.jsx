
import React, { Component } from 'react'
import List from './List'
const userInfo = {
    name: 'John',
    age: '16',
}

function enhanceUserInfo(Original){
    class NewComponent extends Component{
        constructor(){
            super()
            this.state = {
                userInfo: {
                    age: '16',
                    name: 'John',
                }
            }
        }
        render() {
            return  <Original {...this.state.userInfo} {...this.props}/>
        }
    }
    return NewComponent
}
//高阶组件
const Home = enhanceUserInfo(function(props){
    return <h1>Home--{props.name}</h1>
})
function Hello() {
    return <h3>hello</h3>
}
function World() {
    return <h2>world</h2>
}
export class App extends Component {
  static propTypes = {}

  render() {
    return (
      <div>App
          <Hello/>
          <World/>
          <Home/>
          <List/>
      </div>
    )
  }
}

export default App