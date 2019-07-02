import React from "react";
import styles from "./city.css"
const City = () => (
    <div className={styles.city}>
      <ul className="list-group">
        <li className="list-group-item list-group-item-success">San Francisco</li>
        <li className="list-group-item list-group-item-secondary">Istanbul</li>
        <li className="list-group-item list-group-item-info">Tokyo</li>
      </ul>
    </div>
  );

  export default City;