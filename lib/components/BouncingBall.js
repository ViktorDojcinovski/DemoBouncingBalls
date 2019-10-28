import React from 'react';

export const BouncingBall = ({ position, color }) => {
  return (
    <span
      className='bouncingBall'
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        backgroundColor: `${color}`,
        display: 'inline-block',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        position: 'absolute'
      }}
    />
  );
};
