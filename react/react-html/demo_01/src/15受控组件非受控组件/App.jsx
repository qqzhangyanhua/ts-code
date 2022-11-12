import React, { Component } from 'react'

export class App extends Component {
    constructor(){
        super();
        this.state = {
            userName:'1234'
        }
    }
    inputChange(e){
        this.setState({userName:e.target.value})
    }
  render() {
      const {userName} = this.state
    return (
      <div>App
          <h3>{userName}</h3>
          <input type="text" value={userName} onChange={(e) => this.inputChange(e)}/>
      </div>
    )
  }
}

export default App