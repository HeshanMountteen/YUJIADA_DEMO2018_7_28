import heshanMod from '../components/button'
import React from 'react'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils';

it('should call onClick callback if provided',()=>{
    const onClickMock = jest.fn();
    const testInstance = ReactTestUtils.renderIntoDocument(
        <heshanMod onClick={onClickMock}>查询</heshanMod>
    );
    const buttonDom = ReactTestUtils.findRenderedDOMComponentWithClass(testInstance,'');
    ReactTestUtils.Simulate.click(buttonDom);
    expect(onClickMock).toHaveBeenCalled();
})