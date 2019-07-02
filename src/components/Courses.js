import React from "react";
import { Route, Link} from 'react-router-dom';
import styles from "./courses.css";
class Courses extends React.Component {
  render () {
    const {match} = this.props;
    return (
      <div className={styles.courses}>
      <ul className="list-group">
        <li className="list-group-item list-group-item-success"><Link to={`${match.url}/technology`}>Technology</Link></li>
        <li className="list-group-item list-group-item-secondary"><Link to={`${match.url}/business`}>Business</Link></li>
        <li className="list-group-item list-group-item-info"><Link to={`${match.url}/economics`}>Economics</Link></li>
      </ul>
  
      <Route exact path={`${match.path}/:course`} render={({match})=>(<div>This is {match.params.course}</div>)} />
    </div>
    );
  }
}

  export default Courses;