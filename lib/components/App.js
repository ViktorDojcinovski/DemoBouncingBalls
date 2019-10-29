import React from 'react';
import styled from 'styled-components';

import ErrorBoundary from './ErrorBoundary';
import BouncingBallsEnv from './BouncingBallsEnv';

const StyledContainer = styled.div`
  position: absolute;
  width: 800px;
  height: 600px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #17191a;
  overflow: hidden;
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
    <ErrorBoundary>
      <StyledContainer>
        <BouncingBallsEnv />
      </StyledContainer>
    </ErrorBoundary>
  );
}
