import * as React from 'react';
import classNames from 'classnames';
import styles from './ValidationMessage.module.css';

export const ValidationMessage: React.FC<{className?: string}> = (props) => {
    return (
        <div className={classNames(styles.host, props.className)}>{props.children}</div>
    );
};
