import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import loadable from '@loadable/component'
import Home from "./Home"
const City = loadable(()=>import(/* webpackChunkName: "city" */ "./City"));
const Airport = loadable(()=>import(/* webpackChunkName: "airport" */ "./Airport"));
const Courses = loadable(()=>import(/* webpackChunkName: "courses" */ "./Courses"));

class App extends Component {
  render() {
    return (
      <div className="jumbotron">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/airports">Airports</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/cities">Cities</Link></li>
        </ul>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/airports" component={Airport}/>
            <Route path="/cities" component={City}/>
            <Route path="/courses" component={Courses} />
            <Route render={()=>(<div>Sorry, this page doesn't exist.</div>)} />
        </Switch> 
      </div>
    );
  }
}

export default App;