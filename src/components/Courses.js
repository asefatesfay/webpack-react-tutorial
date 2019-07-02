import React from "react";
import { Route, Link} from 'react-router-dom';
class Courses extends React.Component {
  render () {
    const {match} = this.props;
    return (
      <div>
      <ul>
        <li><Link to={`${match.url}/technology`}>Technology</Link></li>
        <li><Link to={`${match.url}/business`}>Business</Link></li>
        <li><Link to={`${match.url}/economics`}>Economics</Link></li>
      </ul>
  
      <Route exact path={`${match.path}/:course`} render={({match})=>(<div>This is {match.params.course}</div>)} />
    </div>
    );
  }
}

  export default Courses;