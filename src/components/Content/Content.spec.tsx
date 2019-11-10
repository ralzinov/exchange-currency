import React from 'react';
import ReactDOM from 'react-dom';
import {Content} from './Content';
import {create} from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Content>Some content</Content>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render with props and children', () => {
    const button = create(
        <Content>Some content</Content>
    );
    expect(button.toJSON()).toMatchSnapshot();
});
