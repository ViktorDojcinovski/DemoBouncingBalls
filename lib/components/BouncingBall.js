import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Create a BouncingBall
 *
 * @export
 * @class BouncingBall
 * @extends {Component}
 */
export default class BouncingBall extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.position) {
      return false;
    }
    return true;
  }

  render() {
    // Destructure props to local variables for better readibility
    const { position, color } = this.props;

    const ballStyle = {
      transform: `translate(${position.x}px, ${position.y}px)`,
      backgroundColor: `${color}`,
      display: 'inline-block',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      position: 'absolute'
    };

    return <span className='bouncingBall' style={ballStyle} />;
  }
}

BouncingBall.propTypes = {
  position: PropTypes.object
};
