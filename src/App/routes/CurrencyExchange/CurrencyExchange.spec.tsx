import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyExchange from './CurrencyExchange';
import {create} from 'react-test-renderer';
import {ICurrencyExchangeProps} from './interfaces';
import {act} from 'react-dom/test-utils';
// import {mount} from 'enzyme';

jest.mock('./CurrencyExchangeForm', () => ({options, value, onChange,}: any) => {
    const React = require('react');
    return <form/>
});

it('renders without crashing', () => {
    const props = {
        loadWallets: () => {
        }
    } as ICurrencyExchangeProps;
    const div = document.createElement('div');
    ReactDOM.render(<CurrencyExchange {...props}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render with props', () => {
    const props = {
        loadWallets: () => {
        }
    } as ICurrencyExchangeProps;
    const button = create(
        <CurrencyExchange {...props}/>
    );
    expect(button.toJSON()).toMatchSnapshot();
});

it('should load wallets after mount', () => {
    const div = document.createElement('div');
    const props = {
        loadWallets: jest.fn()
    } as ICurrencyExchangeProps;

    expect(props.loadWallets).not.toHaveBeenCalled();
    act(() => {
        ReactDOM.render(<CurrencyExchange {...props}/>, div);
    });
    expect(props.loadWallets).toHaveBeenCalled();
    ReactDOM.unmountComponentAtNode(div);
});

it('should ... on form submit', () => {

});

