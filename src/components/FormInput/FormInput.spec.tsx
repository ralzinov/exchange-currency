import React from 'react';
import ReactDOM from 'react-dom';
import {FormInput, IFormInputProps} from './FormInput';
import {create} from 'react-test-renderer';
import {WrappedFieldProps} from 'redux-form';

it('renders without crashing', () => {
    const metaProps: PartialDeep<WrappedFieldProps> = {
        meta: {
            error: 'Error message',
            touched: true,
            invalid: true,
            dirty: true
        }
    };

    const div = document.createElement('div');
    ReactDOM.render(<FormInput {...metaProps as WrappedFieldProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render with props in invalid state', () => {
    const props: PartialDeep<WrappedFieldProps & IFormInputProps> = {
        placeholder: 'Some placeholder',
        className: 'input',
        disabled: false,
        hidden: false,
        meta: {
            error: 'Error message',
            touched: true,
            invalid: true,
            dirty: true
        }
    };
    const component = create(
        <FormInput {...props as (WrappedFieldProps & IFormInputProps)}/>
    );
    expect(component.toJSON()).toMatchSnapshot();
});

it('should not render error state if untouched and pristine', () => {
    const props: PartialDeep<WrappedFieldProps & IFormInputProps> = {
        meta: {
            error: 'Error message',
            touched: false,
            invalid: true,
            dirty: false
        }
    };
    const component = create(
        <FormInput {...props as (WrappedFieldProps & IFormInputProps)}/>
    );
    expect(component.toJSON()).toMatchSnapshot();
});
