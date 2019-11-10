import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './Header';
import {create} from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header>abc</Header>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render with children', () => {
    const button = create(
        <Header>Label</Header>
    );
    expect(button.toJSON()).toMatchSnapshot();
});
