import React, { Component } from "react";

export class MainProductList extends Component {
 
  render() {
    const { productList } = this.props;
    return (
      <div>
        MainProductList
        <ul>
          {productList.map((item) => (
            <li key={item.title}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MainProductList;
