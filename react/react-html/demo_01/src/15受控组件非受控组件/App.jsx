import React, { Component } from 'react'

export class App extends Component {
    constructor(){
        super();
        this.state = {
            userName:'1234',
            fruit: 'apple'
        }
    }
    inputChange(e){
        this.setState({userName:e.target.value})
    }
    handelSelect(e){
        this.setState({fruit:e.target.value})

    }
  render() {
      const {userName,fruit} = this.state
    return (
      <div>App
          <h3>{userName}</h3>
          <input type="text" value={userName} onChange={(e) => this.inputChange(e)}/>
          <select onChange={(e) => this.handelSelect(e)} value={fruit}>
              <option value="apple">苹果</option>
              <option value="dd">句子</option>
              <option value="ape">香蕉</option>

          </select>
      </div>
    )
  }
}

export default App