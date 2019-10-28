import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('App', () => {
  it('should render properly', () => {
    const component = renderer.create(<App />);

    // ...assert here
    expect(component).toMatchSnapshot();
  });
});
