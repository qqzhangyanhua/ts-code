import React, { Component } from 'react'

export class Home extends Component {
  render() {
      const {name ,age} = this.props
    return (
      <div>Home

          <p> {name}==={age}</p>
      </div>
    )
  }
}

export default Home