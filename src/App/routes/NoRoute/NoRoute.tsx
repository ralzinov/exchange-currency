import * as React from 'react';
import {Link} from 'react-router-dom';
import styles from './NoRoute.module.css';

const NoRoute: React.FC = () => {
    return (
        <div className={styles.host}>
            <h1>404</h1>
            <Link to={'/'}>Go to main</Link>
        </div>
    );
};

export default NoRoute;
