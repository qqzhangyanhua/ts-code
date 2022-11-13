import React, { Component ,StrictMode } from 'react'
import Home from './Home'
import Profile from './Profile'
export class App extends Component {
  render() {
    return (
      <div>
          <StrictMode>
          <Home/>
          </StrictMode>
          <Profile/>
      </div>
    )
  }
}

export default App