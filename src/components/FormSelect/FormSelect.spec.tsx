import React from 'react';
import ReactDOM from 'react-dom';
import {FormSelect, IFormSelectProps} from './FormSelect';
import {create} from 'react-test-renderer';
import {WrappedFieldProps} from 'redux-form';
import {Simulate} from 'react-dom/test-utils';

jest.mock("react-select", () => ({ options, value, onChange, }: any) => {
    const React = require('react');
    function handleChange(event: any) {
        const option = options.find((o: any) => o.value === event.currentTarget.value);
        onChange(option);
    }
    return (
        <select data-testid="select" value={value} onChange={handleChange}>
            {options.map(({ label, value }: any) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
});

it('renders without crashing', () => {
    const metaProps: PartialDeep<IFormSelectProps> = {
        meta: {
            error: 'Error message',
            touched: true,
            invalid: true,
            dirty: true
        },
        input: {},
        options: []
    };

    const div = document.createElement('div');
    ReactDOM.render(<FormSelect {...metaProps as IFormSelectProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render with props in invalid state', () => {
    const props: PartialDeep<WrappedFieldProps & IFormSelectProps> = {
        placeholder: 'Some placeholder',
        className: 'input',
        meta: {
            error: 'Error message',
            touched: true,
            invalid: true,
            dirty: true
        },
        input: {},
        options: []
    };
    const component = create(
        <FormSelect {...props as (WrappedFieldProps & IFormSelectProps)}/>
    );
    expect(component.toJSON()).toMatchSnapshot();
});

it('should not render error state if untouched and pristine', () => {
    const props: PartialDeep<WrappedFieldProps & IFormSelectProps> = {
        meta: {
            error: 'Error message',
            touched: false,
            invalid: true,
            dirty: false
        },
        input: {},
        options: []
    };
    const component = create(
        <FormSelect {...props as (WrappedFieldProps & IFormSelectProps)}/>
    );
    expect(component.toJSON()).toMatchSnapshot();
});

it('should call onChange event handler', () => {
    const spyOnChange = jest.fn();
    const metaProps: PartialDeep<WrappedFieldProps & IFormSelectProps> = {
        meta: {},
        input: {
            onChange: spyOnChange
        },
        options: [{
            value: 'A',
            label: 'A',
        }, {
            value: 'B',
            label: 'B',
        }]
    };

    const div = document.createElement('div');
    ReactDOM.render(<FormSelect {...metaProps as IFormSelectProps} />, div);

    const selectEl = div.querySelector('select') as HTMLSelectElement;
    selectEl.value = 'B';
    Simulate.change(selectEl);

    expect(spyOnChange).toBeCalledWith({
        value: 'B',
        label: 'B',
    });

    ReactDOM.unmountComponentAtNode(div);
});
