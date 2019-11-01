import React from 'react';
import { mount, shallow } from 'enzyme';

import BouncingBall from '../BouncingBall';

// Position property stub
const position = { x: 50, y: 50 };

describe('BouncingBall', () => {
  let component;

  // Setup
  beforeEach(() => {
    component = mount(
      <BouncingBall
        position={position}
        key={Math.random()}
        color={'some color'}
      />
    );
  });
  // Teardown
  afterEach(() => {
    component.unmount();
  });
  it('should render properly', () => {
    shallow(
      <BouncingBall
        position={{ x: Math.random(), y: Math.random() }}
        key={Math.random()}
        color={'some color'}
      />
    );
  });
  it('should set transform css property according to received position property value', () => {
    //...arrange
    const span = component.find('.bouncingBall');
    //...assert
    expect(span.prop('style')).toHaveProperty(
      'transform',
      'translate(50px, 50px)'
    );
  });
});
