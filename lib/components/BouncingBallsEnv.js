import React, { Component } from 'react';
import styled from 'styled-components';

import { BouncingBall } from './BouncingBall';

const StyledEnvironment = styled.div`
  width: 1000px;
  height: 600px;
  overflow: hidden;
`;

/**
 * Create Bouncing balls hive
 *
 * @export
 * @class BouncingBallsEnv
 * @extends {Component}
 */
export default class BouncingBallsEnv extends Component {
  /**
   * Class members (properties)
   *
   */
  ctx = null;
  width = null;
  height = null;
  fps = 1 / 40;
  dt = 10;
  timer;
  mouse = { x: 0, y: 0, isDown: false };
  drag = 0.47;
  density = 1.22;
  area = 0.1256;
  rho = 1.22;
  g = 9.81;

  constructor(props) {
    super(props);
    // Init state
    this.state = {
      balls: []
    };

    // Do not clutter the constructor,
    // Every initial setting push it in the setup method
    this.setup();
  }

  /**
   * Setup the environment for the BouncingBalls
   *
   */
  setup() {
    // Init values for class members
    setInterval(this.loop, this.dt);
    this.width = 1000;
    this.height = 600;
  }

  onMouseDownHandler = e => {
    this.setMousePosition(e);
    this.mouse.isDown = true;
    const max = 255;
    const min = 20;
    const r = 75 + Math.floor(Math.random() * (max - min) - min);
    const g = 75 + Math.floor(Math.random() * (max - min) - min);
    const b = 75 + Math.floor(Math.random() * (max - min) - min);
    // Enable up to 1000 BouncingBalls instances on the stage
    const key = Math.random() * 1000;

    const newBalls = this.state.balls;

    const newBall = {
      key,
      velocity: { x: Math.random() * 10, y: 1 },
      position: { x: this.mouse.x, y: this.mouse.y },
      mass: 100,
      color: `rgb(${r}, ${g}, ${b})`
    };

    newBalls.push(newBall);

    this.setState({ balls: newBalls });
  };

  onMouseUpHandler = () => {
    this.mouse.isDown = false;
    const numOfBalls = this.state.balls.length;
    // Keep the immutability of the state by always assigning to new objects
    // (eventually use any technique to avoid passing data by reference)
    const currentBalls = this.state.balls;
    const currentBallVelocity = Object.assign(
      {},
      currentBalls[numOfBalls - 1].velocity
    );
    currentBallVelocity.x = 1;
    currentBallVelocity.y = 1;
    // Assign new object with the state assignment setter
    this.setState({ balls: currentBalls });
  };

  /**
   * Loop over the balls and calculate their new position
   *
   * @return {null}
   */
  loop = () => {
    for (let i = 0; i < this.state.balls.length; i++) {
      if (!this.mouse.isDown || i != this.state.balls.length - 1) {
        // All coeficients (constants) taken into account through coeficient k
        // Co = -0.5 * Cd * A * v^2 * rho

        const Co = -0.5 * this.drag * this.area * this.density * this.rho;
        const theBall = this.state.balls[i];

        let fx =
          Co *
          theBall.velocity.x *
          theBall.velocity.x *
          (theBall.velocity.x / Math.abs(theBall.velocity.x));
        let fy =
          Co *
          theBall.velocity.y *
          theBall.velocity.y *
          (theBall.velocity.y / Math.abs(theBall.velocity.y));
        fx = isNaN(fx) ? 0 : fx;
        fy = isNaN(fy) ? 0 : fy;
        //Calculating the accleration of the ball
        //F = ma or a = F/m
        const ax = fx / theBall.mass;
        const ay = this.g + fy / theBall.mass;
        // Keep the immutability of the state by always assigning to new objects
        // (eventually use any technique to avoid passing data by reference)
        const currentBalls = this.state.balls;
        const currentBall = Object.assign({}, theBall);
        const currentBallVelocity = Object.assign({}, currentBall.velocity);
        const currentBallPosition = Object.assign({}, currentBall.position);
        // Calculate velocity of the ball
        currentBallVelocity.x += ax * this.fps;
        currentBallVelocity.y += ay * this.fps;
        // Calculate velocity of the ball
        currentBallPosition.x += ax * this.fps;
        currentBallPosition.y += ay * this.fps;
        //Calculating the position of the ball
        currentBallPosition.x += currentBallVelocity.x * this.fps * 100;
        currentBallPosition.y += currentBallVelocity.y * this.fps * 100;

        currentBall.velocity.x = currentBallVelocity.x;
        currentBall.velocity.y = currentBallVelocity.y;

        currentBall.position.x = currentBallPosition.x;
        currentBall.position.y = currentBallPosition.y;

        this.collisionGround(currentBall);

        this.setState({ balls: currentBalls });
      }
    }
  };

  /**
   * Detect collision with the ground, use the height class member as bottom value
   *
   * @param {object} ball - new bouncing ball, JS object in an indexed Array
   * @return {null}
   */
  collisionGround = ball => {
    if (ball.position.y > this.height - 20) {
      ball.velocity.y = -1 * ball.velocity.y;
      ball.position.y = this.height - 20;
    }
  };

  /**
   * Implicit get mouse position
   *
   */
  getMousePosition = () => {
    return this.mouse;
  };

  /**
   * Implicit set mouse position
   *
   */
  setMousePosition = e => {
    this.mouse = { x: e.pageX, y: e.pageY };
  };

  render() {
    const balls = this.state.balls.map(ball => {
      return (
        <BouncingBall
          key={ball.key}
          color={ball.color}
          position={ball.position}
        />
      );
    });

    return (
      <StyledEnvironment
        onMouseDown={this.onMouseDownHandler.bind(this)}
        onMouseUp={this.onMouseUpHandler.bind(this)}
      >
        {balls}
      </StyledEnvironment>
    );
  }
}
