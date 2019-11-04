import * as React from 'react';
import classNames from 'classnames';
import styles from './FormInput.module.css';
import {WrappedFieldProps} from 'redux-form';
import {ValidationMessage} from '../ValidationMessage';

interface IFormInputProps {
    className?: string;
    placeholder: string;
}

export const FormInput: React.FC<WrappedFieldProps & IFormInputProps> = (props) => {
    const {error, touched, invalid} = props.meta;

    const className = classNames(
        invalid && touched && styles.invalid,
        props.className,
        styles.host
    );

    return (
        <>
            <input
                placeholder={props.placeholder || ''}
                className={className}
                {...props.input}
            />
            <ValidationMessage>{touched ? error : ''}</ValidationMessage>
        </>
    );
};
