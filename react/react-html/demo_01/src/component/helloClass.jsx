import React from "react";

class HelloClass extends React.Component {
  constructor() {
      console.log('constructor');
    super();
    this.state = {
      message: "Hello class",
    };
  }
  handelClick() {
    this.setState({ message: "class Hello" });
  }
  render() {
    console.log("render");
    return (
      <div>
        <h2>我是类组件</h2>
        <h4>{this.state.message}</h4>
        <button onClick={() => this.handelClick()}>按钮</button>
      </div>
    );
  }
  //组件被更新完成dom发生更新
  componentDidMount() {
    console.log("componentDidmount");
  }
  //   组件DOM更新完成dom发生更新
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
}
export default HelloClass;
