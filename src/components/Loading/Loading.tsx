import * as React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.host}>
            <div className={styles.spinner}>
                <div/><div><div/></div>
            </div>
        </div>
    );
};

export default Loading;
