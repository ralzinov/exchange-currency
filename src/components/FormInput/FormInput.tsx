import * as React from 'react';
import classNames from 'classnames';
import styles from './FormInput.module.css';
import {WrappedFieldProps} from 'redux-form';
import {ValidationMessage} from '../ValidationMessage';

export interface IFormInputProps {
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    hidden?: boolean;
}

export const FormInput: React.FC<WrappedFieldProps & IFormInputProps> = (props) => {
    const {error, touched, invalid, dirty} = props.meta;
    const className = classNames(
        invalid && touched && styles.invalid,
        props.className,
        styles.input
    );

    return (
        <div className={styles.host}>
            <input
                placeholder={props.placeholder || ''}
                className={className}
                disabled={props.disabled}
                hidden={props.hidden}
                {...props.input}
            />
            <ValidationMessage className={styles.validationMessage}>
                {touched || dirty ? error : ''}
            </ValidationMessage>
        </div>
    );
};
