import React, { Component,createRef,forwardRef } from "react";
import Home from "./Home"
 
const Hello = forwardRef(function(props,ref){
    return <h2 ref={ref}>函数组件</h2>
})



// 获取dom
export class App extends Component {
    constructor(){
        super()
        this.titleRef = createRef()
        this.titleEl = null
        this.homeRef = createRef()
        this.helloRef = createRef()
    }
  handelClick() {
    //   1在dom元素上绑定一个ref字符串
    // console.log("2222",this.refs.why);
    //2创建好ref对象====推荐
    // 3console.log('22222',this.titleRef.current);
    // 函数形式
    console.log('22222',this.titleEl);
  }
  getComponent(){
      console.log('11111',this.homeRef.current);
    //   这样可以调用子组件方法
    //   this.homeRef.current.test()
  }
  getFnComponent(){
      console.log('2222222',this.helloRef.current);
  }
  render() {
    return (
      <div>
        <h2 ref='why'>hello world</h2>
        <h2 ref={this.titleRef}>hello world</h2>
        <h2 ref={(e)=> this.titleEl =e}>hello world</h2>
        <Home ref={this.homeRef}/>
        <Hello ref ={this.helloRef}/>
        <button onClick={() => this.handelClick()}>按钮</button>
        <button onClick={() => this.getComponent()}>获取组件</button>
        <button onClick={() => this.getFnComponent()}>获取函数组件</button>


      </div>
    );
  }
}

export default App;
