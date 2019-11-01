import React, { Component } from 'react';
import styled from 'styled-components';

import BouncingBall from './BouncingBall';

const StyledEnvironment = styled.section`
  width: 100%;
  height: 100%;
  div {
    width: 100%;
    height: 100%;
  }
`;

/**
 * Create Bouncing balls environment
 *
 * @export
 * @class BouncingBallsEnv
 * @extends {Component}
 */
export default class BouncingBallsEnv extends Component {
  /**
   * Class members (properties) mainly describing the environment for the balls. Values
   * are somewhere around so they emulate real physical system.
   *
   * Changing the values in reasonable values may abstract some similar environment.
   * For example if you change the value of g to 1.625 the abstraction starts to act like
   * moon environment.
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

    // Do not clutter the constructor.
    // Every initial setting should get evaluated in the setup method.
    this.setup(800, 600, this.state.balls);

    // Eventualy bind event handlers to an instance here. For example:
    // this.myEventHandler = this.myEventHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this, this.state.balls);
  }

  /**
   * Setup the environment for the BouncingBalls
   *
   * @param {number} width - width of the environment
   * @param {number} height - height of the environment
   * @param {array} balls - list of balls abstractions
   */
  setup(width, height, balls) {
    // Init values for class members
    setInterval(() => {
      this.loop(balls);
    }, this.dt);
    this.width = width;
    this.height = height;
  }

  /**
   * Click handler. The component will rerender when called
   *
   * @param {eventObject} e
   * @param {array} balls - list of balls abstractions
   * @return {array}
   */
  onClickHandler = (balls, e) => {
    this.setMousePosition(e);
    this.mouse.isDown = true;

    // Generate random hex color for every ball
    const r = Math.floor(50 + Math.random() * 200);
    const g = Math.floor(50 + Math.random() * 200);
    const b = Math.floor(50 + Math.random() * 200);

    // Create unique key for every ball abstraction
    // Eventually use some other semantic property
    const key = Math.random();

    const newBalls = balls;

    // Consider this handler as factory for balls. Create new object with initial values
    const newBall = {
      key,
      velocity: { x: Math.random() * 5, y: 1 },
      position: { x: this.mouse.x, y: this.mouse.y },
      mass: 100,
      color: `rgb(${r}, ${g}, ${b})`
    };

    newBalls.push(newBall);

    this.setState({ balls: newBalls });

    return newBalls;
  };

  /**
   * Loop over the balls and calculate their new position. The component will rerender when called
   *
   * @param {array} balls - list of balls abstractions
   * @return {array}
   */
  loop = balls => {
    for (let i = 0; i < balls.length; i++) {
      if (!this.mouse.isDown || i != balls.length) {
        // All coeficients (constants) taken into account through coeficient Co
        // Co = -0.5 * Cd * A * v^2 * rho
        const Co = -0.5 * this.drag * this.area * this.density * this.rho;
        const theBall = balls[i];

        if (theBall && theBall.position) {
          // Keep the immutability of the state by always assigning to new objects
          // (eventually use any technique to avoid shallow copying)
          let currentBall = Object.assign({}, balls[i]);
          const currentBallVelocity = Object.assign({}, currentBall.velocity);
          const currentBallPosition = Object.assign({}, currentBall.position);

          // Calculate force components
          // F = Co * v^2 * (v/abs(v))
          let fx =
            Co *
            currentBall.velocity.x *
            currentBall.velocity.x *
            (currentBall.velocity.x / Math.abs(currentBall.velocity.x));
          let fy =
            Co *
            currentBall.velocity.y *
            currentBall.velocity.y *
            (currentBall.velocity.y / Math.abs(currentBall.velocity.y));

          fx = isNaN(fx) ? 0 : fx;
          fy = isNaN(fy) ? 0 : fy;

          // Calculating the accleration of the ball
          // F = ma or a = F/m
          const ax = fx / currentBall.mass;
          const ay = this.g + fy / currentBall.mass;

          // Calculate velocity of the ball
          currentBallVelocity.x += ax * this.fps;
          currentBallVelocity.y += ay * this.fps;

          // Calculate velocity of the ball
          currentBallPosition.x += ax * this.fps;
          currentBallPosition.y += ay * this.fps;

          //Calculating the position of the ball
          currentBallPosition.x += currentBallVelocity.x * this.fps * 100;
          currentBallPosition.y += currentBallVelocity.y * this.fps * 100;

          // Translate calcualted values to the ball abstraction
          // ...velocity
          currentBall.velocity.x = currentBallVelocity.x;
          currentBall.velocity.y = currentBallVelocity.y;
          // ...position
          currentBall.position.x = currentBallPosition.x;
          currentBall.position.y = currentBallPosition.y;

          this.collisionGround(currentBall);

          this.shouldDestroyBall(currentBall);

          // Assign the ball abstraction object to the same position in the array
          balls[i] = currentBall;

          this.setState({ balls });
        }
      }
    }

    return balls;
  };

  /**
   * Detect collision with the ground, use the height class member as bottom value
   *
   * @param {object} ball - new bouncing ball abstraction, JS object in an indexed Array
   * @return {object}
   */
  collisionGround = ball => {
    if (ball.position.y > this.height - 20) {
      ball.velocity.y = -0.92 * ball.velocity.y;
      ball.position.y = this.height - 20;
    }

    return ball;
  };

  /**
   * Evaluate if the ball abstraction should be destroyed.
   *
   * @param {object} ball - new bouncing ball, JS object in an indexed Array
   */
  shouldDestroyBall = ball => {
    if (ball.position && ball.position.x - 40 > this.width) {
      ball.position = null;
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
      <StyledEnvironment>
        <div className='wrapper' onClick={this.onClickHandler}>
          {balls}
        </div>
      </StyledEnvironment>
    );
  }
}
