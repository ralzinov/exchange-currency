import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from './Button';
import {create} from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render with props and children', () => {
    const clickSpy = jest.fn();
    const button = create(
        <Button className="test-class-name" onClick={clickSpy}>Label</Button>
    );
    expect(button.toJSON()).toMatchSnapshot();
});
