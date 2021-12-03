import React from 'react';
import styles from './App.less';
import Routes from '~/router/Routes';

function App() {
  return (
    <div className={styles.App}>
      <Routes />
    </div>
  );
}

export default App;
