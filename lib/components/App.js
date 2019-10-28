import React from 'react';
import styled from 'styled-components';

import BouncingBallsEnv from './BouncingBallsEnv';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #17191a;

  .bouncy {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: greenyellow;
    position: absolute;
  }
`;

export default function App() {
  return (
    <StyledContainer>
      <BouncingBallsEnv />
    </StyledContainer>
  );
}
