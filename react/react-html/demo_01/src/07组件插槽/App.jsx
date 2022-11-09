import React, { Component } from "react";
import NavBar from "./Nav-bar";
export class App extends Component {
  render() {
    return (
      <div>
        App
        <NavBar centerSlot={<h2>标题</h2>} leftSlots={item=><button>{item}</button>}>
         
        </NavBar>
      </div>
    );
  }
}

export default App;
