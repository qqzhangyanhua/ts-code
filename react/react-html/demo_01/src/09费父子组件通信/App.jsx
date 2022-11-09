import React, { Component } from 'react'
import Home from './Home'
const ThemeContent = React.createContext()
export class App extends Component {
  render() {
    return (
      <div>App

          <Home name='zhangsan' age={12}/>
      </div>
    )
  }
}

export default App