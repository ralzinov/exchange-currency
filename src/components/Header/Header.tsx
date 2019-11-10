import * as React from 'react';
import {ReactNode} from 'react';
import styles from './Header.module.css';

interface IHeaderProps {
    children: ReactNode|ReactNode[];
}

export const Header = (props: IHeaderProps) => {
    return (
        <header className={styles.host}>{props.children}</header>
    );
};
