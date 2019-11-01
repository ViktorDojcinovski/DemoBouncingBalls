import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('App', () => {
  it('should render properly', () => {
    //...arrange
    const component = renderer.create(<App />);
    //...act
    //...assert
    expect(component).toMatchSnapshot();
  });
});
