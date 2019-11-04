import * as React from 'react';
import classNames from 'classnames';
import {WrappedFieldProps} from 'redux-form';
import Select, {ValueType} from 'react-select';
import styles from './FormSelect.module.css';
import {ValidationMessage} from '../ValidationMessage';

export interface IFormSelectOption<T = unknown> {
    label: string;
    value: T;
}

interface IFormSelectProps {
    options: IFormSelectOption[];
    className?: string;
    placeholder?: string;
}

export const FormSelect: React.FC<WrappedFieldProps & IFormSelectProps> = (props) => {
    const {error, touched, invalid} = props.meta;
    const onSelect = (option: ValueType<IFormSelectOption>) => {
        props.input.onChange((option as IFormSelectOption).value);
    };

    const className = classNames(
        invalid && touched && styles.invalid,
        props.className,
        styles.host
    );

    return (
        <>
            <Select
                className={className}
                placeholder={props.placeholder || ''}
                options={props.options}
                onChange={onSelect}
                onFocus={props.input.onFocus}
                onBlur={props.input.onBlur}
            />
            <ValidationMessage>{touched ? error : ''}</ValidationMessage>
        </>
    );
};
