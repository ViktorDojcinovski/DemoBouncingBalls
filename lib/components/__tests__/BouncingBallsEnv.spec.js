import React from 'react';
import { mount, shallow } from 'enzyme';

import BouncingBallsEnv from '../BouncingBallsEnv';

// Balls stub
const balls = [];
// Single ball abstraction stub

describe('BouncingBallsEnv', () => {
  let component;
  let instance;
  // Setup
  beforeEach(() => {
    component = mount(<BouncingBallsEnv />);
    instance = component.instance();
  });
  // Teardown
  afterEach(() => {
    component.unmount();
  });

  // Define single specs here
  it('should render properly', () => {
    shallow(<BouncingBallsEnv />);
  });

  it('should call onClickHandler on click', () => {
    //...arrange
    const wrapper = component.find('.wrapper');
    instance.setMousePosition = jest.fn();
    instance.onClickHandler = jest.fn();
    instance.forceUpdate();
    //...act
    wrapper.simulate('click');
    //...assert
    expect(instance.onClickHandler).toHaveBeenCalled();
  });

  it('should push new ball abstraction in balls array onClick', () => {
    //...arrange
    let newBalls = [];
    instance.setMousePosition = jest.fn();
    instance.forceUpdate();
    //...act
    newBalls = instance.onClickHandler(balls, {});
    //...assert
    expect(newBalls.length).toBe(1);
  });
});
