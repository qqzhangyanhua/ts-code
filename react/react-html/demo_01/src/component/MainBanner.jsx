import React, { Component } from 'react'
import PropTypes from 'prop-types'
export class MainBanner extends Component {
  constructor(props) {
    super(props);
    console.log('props');
  }
  render() {
    const{banner} = this.props;
    return (
      <div>MainBanner
        <ul>
         {banner.map(item => <li key={item.title}>{item.title}</li>)}
        </ul>
      </div>
    )
  }
}
MainBanner.propTypes = {banner: PropTypes.array}

export default MainBanner