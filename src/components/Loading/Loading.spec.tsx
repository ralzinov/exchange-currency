import React from 'react';
import ReactDOM from 'react-dom';
import {Loading} from './Loading';
import {create} from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loading/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render with children', () => {
    const button = create(
        <Loading/>
    );
    expect(button.toJSON()).toMatchSnapshot();
});
