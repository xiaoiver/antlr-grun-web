import React from 'react';
import 'antd/dist/antd.css';
import styles from './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Antlr grun for web</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
