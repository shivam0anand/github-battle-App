import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render(){
    return (
    <div className="home-header">
      <h3>Github Battle: Battle your friends... and stuff.</h3>
      <Link to="/battle" className="home-btn">battle</Link>
    </div>
      )
  }
}


export default Home;