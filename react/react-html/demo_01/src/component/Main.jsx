import React, { Component } from "react";
import MainBanner from "./MainBanner";
import MainProductList from "./MainProductList";
import axios from 'axios';
export class Main extends Component {
  constructor() {
    super();
    this.state = {
        banner:['sss','ddddd','ffffff'],
        productList:['sss','dd','ffffff'],
    }
  }
  componentDidMount() {
      axios.get('http://123.207.32.32:8000/home/multidata').then(res=> {
        console.log(res)
        const banners = res.data.data.banner.list
        const recommend = res.data.data.recommend.list
        this.setState({
            banner: banners, 
            productList:recommend
        })
      })
  }
  render() {
      const {banner, productList} = this.state
    return (
      <div>
        Main
        <MainBanner banner={banner} />
        <MainProductList productList={productList} />
      </div>
    );
  }
}

export default Main;
