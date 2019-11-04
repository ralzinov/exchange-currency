import * as React from 'react';
import classnames from 'classnames';
import styles from './Button.module.css';

export interface IButtonProps extends React.ButtonHTMLAttributes<unknown> {
    className?: string;
}

export const Button: React.FC<IButtonProps> = (props) => {
    return (
        <button {...props} className={classnames(styles.host, props.className)}>{props.children}</button>
    );
};
