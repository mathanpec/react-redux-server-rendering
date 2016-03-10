import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './MainContainer.style.css';

class MainContainer extends Component {
  render () {
    return (
      <div>
        <div className={styles['navbar']}>
          <Link to='/todo' className={styles['nav-link']}>Todo</Link>
          <Link to='/dummy' className={styles['nav-link']}>Dummy</Link>
        </div>
        <div className={styles['content']}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  children: PropTypes.node
};

export default MainContainer;
