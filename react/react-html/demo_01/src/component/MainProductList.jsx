import React, { Component } from "react";

export class MainProductList extends Component {
 
  render() {
    const { productList } = this.props;
    return (
      <div>
        MainProductList
        <ul>
          {productList.map((item,index) => (
            <li className="item" key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MainProductList;
