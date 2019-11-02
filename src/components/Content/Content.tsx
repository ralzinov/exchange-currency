import * as React from 'react';
import {ReactNode} from 'react';
import styles from './Content.module.css';

interface IContentProps {
    children: ReactNode;
}

const Content = (props: IContentProps) => {
    return (
        <div className={styles.host}>{props.children}</div>
    );
};

export default Content;
