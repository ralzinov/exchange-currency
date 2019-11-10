import React from 'react';
import ReactDOM from 'react-dom';
import {ValidationMessage} from './ValidationMessage';
import {create} from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ValidationMessage>abc</ValidationMessage>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render with children', () => {
    const button = create(
        <ValidationMessage className="test">Label</ValidationMessage>
    );
    expect(button.toJSON()).toMatchSnapshot();
});

