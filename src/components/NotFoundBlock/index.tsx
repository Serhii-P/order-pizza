import React from 'react';

import styles from './NotFoundBlock.module.scss';

 const NotFoundBlock = () => {
  return (
    <div >
      <h1 className={styles.root}>
        <span>😕</span>
        <br />
        Oops. Page not found...
      </h1>
      <p className={styles.description}>
        Unfortunately page not found
      </p>
    </div>
  );
};

export default NotFoundBlock