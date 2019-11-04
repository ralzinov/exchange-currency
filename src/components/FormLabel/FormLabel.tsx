import * as React from 'react';
import classNames from 'classnames';
import styles from './FormLabel.module.css';

interface IFormLabelProps {
    className?: string;
    text: string;
}

export const FormLabel: React.FC<IFormLabelProps> = (props) => {
    return (
        <label className={classNames(styles.host, props.className)}>
            <span className={styles.text}>{props.text}</span>
            {props.children}
        </label>
    );
};
