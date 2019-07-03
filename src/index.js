import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { TimerLengthControl } from "./TimerLengthControl";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brkLength: 5,
      sessLength: 25,
      session: 1500,
      timerType: "Session",
      timerState: "Stopped",
      intervalID: ""
    };
  }

  setBrkLength = e => {
    this.lengthControl(
      "brkLength",
      e.target.value,
      this.state.brkLength,
      "Session"
    );
  };
  setSessLength = e => {
    this.lengthControl(
      "sessLength",
      e.target.value,
      this.state.sessLength,
      "Break"
    );
  };

  lengthControl = (stateToChange, sign, currentLength, timerType) => {
    if (this.state.timerType === timerType) {
      if (sign === "-" && currentLength !== 1) {
        this.setState({ [stateToChange]: currentLength - 1 });
      } else if (sign === "+" && currentLength !== 1) {
        this.setState({ [stateToChange]: currentLength + 1 });
      }
    } else {
      if (sign === "-" && currentLength !== 1) {
        this.setState({
          [stateToChange]: currentLength - 1,
          timer: currentLength * 60 - 60
        });
      } else if (sign === "+" && currentLength !== 60) {
        this.setState({
          [stateToChange]: currentLength + 1,
          timer: currentLength * 60 + 60
        });
      }
    }
  };

  timerControl = () => {
    let control =
      this.state.timerState === "stopped"
        ? (this.beginCountDown(), this.setState({ timerState: "running" }))
        : (this.setState({ timerState: "stopped" }),
          this.state.intervalID && this.state.intervalID.cancel());
  };

  beginCountDown = () => {
    this.setState({
      intervalID: setInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000)
    });
  };

  decrementTimer() {
    this.setState({ timer: this.state.timer - 1 });
  }
  phaseControl() {
    let timer = this.state.timer();
    this.warning(timer);
    if (timer < 0) {
      this.state.timerType === "Session"
        ? (this.beginCountDown(),
          this.switchTimer(this.state.brkLength * 60, "Break"))
        : (this.state.intervalID && this.state.intervalID.cancel(),
          this.beginCountDown(),
          this.switchTimer(this.state.sessLength * 60, "Session"));
    }
  }
  // [TODO: ]
  clockify = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  render() {
    return (
      <div className="App">
        <h1>Build a Pomodoro Clock</h1>
        <div className="timer-container">
          <TimerLengthControl
            onClick={this.setBrkLength}
            title="Break Length"
            brkLength={this.state.brkLength}
          />
          <div className="break" />
          <TimerLengthControl
            onClick={this.setSessLength}
            title="Session Length"
            brkLength={this.state.sessLength}
          />
        </div>
        <div className="timer-wrapper">
          <div className="container">
            <h3>Session</h3>
            <h1>{this.clockify()}</h1>
          </div>
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Timer />, rootElement);
