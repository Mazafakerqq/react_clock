/* eslint-disable no-console */
import * as React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface ClockProps {
  name: string;
}

interface ClockState {
  time: Date;
}

class Clock extends React.Component<ClockProps, ClockState> {
  private timerId: number | undefined;

  state: ClockState = { time: new Date() };

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      const currentTime = new Date();

      this.setState({ time: currentTime });
      console.log(currentTime.toUTCString().slice(-12, -4));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>
        {' time is '}
        <span className="Clock__time">
          {this.state.time.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}

interface AppState {
  hasClock: boolean;
  clockName: string;
  time: Date;
}

class App extends React.Component<{}, AppState> {
  private nameChangeTimer: number | undefined;

  state: AppState = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  componentDidMount() {
    this.nameChangeTimer = window.setInterval(() => {
      this.setState((prevState: AppState) => {
        const newName = getRandomName();

        console.warn(`Renamed from ${prevState.clockName} to ${newName}`);

        return { clockName: newName };
      });
    }, 3300);

    document.addEventListener('contextmenu', this.handleRightClick);
    document.addEventListener('click', this.handleLeftClick);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
    clearInterval(this.nameChangeTimer);
  }

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleLeftClick = () => {
    this.setState({ hasClock: true, time: new Date() });
  };

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.hasClock && <Clock name={this.state.clockName} />}
      </div>
    );
  }
}

export { App };
