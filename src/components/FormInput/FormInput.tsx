import * as React from 'react';
import classNames from 'classnames';
import styles from './FormInput.module.css';
import {WrappedFieldProps} from 'redux-form';
import {ValidationMessage} from '../ValidationMessage';

interface IFormInputProps {
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
        styles.host
    );

    return (
        <div>
            <input
                placeholder={props.placeholder || ''}
                className={className}
                disabled={props.disabled}
                hidden={props.hidden}
                {...props.input}
            />
            <ValidationMessage>{touched || dirty ? error : ''}</ValidationMessage>
        </div>
    );
};
