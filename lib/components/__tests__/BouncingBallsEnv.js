import React from 'react';
import renderer from 'react-test-renderer';

import BouncingBall from '../BouncingBallsEnv';

describe('BouncingBallsEnv', () => {
  it('should render properly', () => {
    const component = renderer.create(<BouncingBall />);

    // ...assert here
    expect(component).toMatchSnapshot();
  });
});
