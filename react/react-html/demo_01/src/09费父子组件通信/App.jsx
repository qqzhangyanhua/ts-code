import React, { Component,memo } from 'react'
import Home from './Home'


const Portal = memo(function (props){
    console.log('执行了protal===');
    return <h2>{props.title}</h2>
})
export class App extends Component {
    constructor(){
        super()
        this.states={
            message: 'hello',
            title: 'Welcome'
        }
    }
    handelClick() {
        this.setState({message:'world'})
    }
  render() {
      const {title, message} = this.states
    return (
      <div>App
          <h3> hello--{message}</h3>
          <button onClick={()=>this.handelClick()}>按钮1</button>
          <Home name='zhangsan1111' age={12}/>
          <Portal title={title}/>
      </div>
    )
  }
}

export default App