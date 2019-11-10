import React from 'react';
import ReactDOM from 'react-dom';
import NoRoute from './NoRoute';
import {create} from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NoRoute /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render with props and children', () => {
    const button = create(
        <BrowserRouter><NoRoute /></BrowserRouter>
    );
    expect(button.toJSON()).toMatchSnapshot();
});
