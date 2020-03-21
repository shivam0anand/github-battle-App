import React, {Component} from 'react'
import Popular from './Popular';
import './../index.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Nav } from './nav';
import Home from './Home';
import Battle from './Battle';


// var 
// var Route = Router.Route;

class App extends Component {
  render(){
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/popular' component={Popular} />
            <Route path='/battle' component={Battle} />
          </Switch>
      </div>
      </Router> 
    )
  }
}

export default App;









