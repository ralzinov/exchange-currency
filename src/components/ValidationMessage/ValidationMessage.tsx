import * as React from 'react';
import styles from './ValidationMessage.module.css';

export const ValidationMessage: React.FC = (props) => {
    return (
        <div className={styles.host}>{props.children}</div>
    );
};
