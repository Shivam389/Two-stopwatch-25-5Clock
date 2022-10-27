import './App.css';
import React, {Component} from 'react';

let interval="";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      breakL:5,
      sessionL:25,
      stopped:true,
      type:"Session",
      timer:1500
    }
    this.reset = this.reset.bind(this);
    this.clockFormat = this.clockFormat.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.timeControl = this.timeControl.bind(this);
    this.countDown = this.countDown.bind(this);
    this.dec = this.dec.bind(this);
  }
  
  reset(){
    this.setState({
      breakL:5,
      sessionL:25,
      stopped:true,
      type:"Session",
      timer:1500
    });
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;
    clearInterval(interval);
  }
  clockFormat(){
    let minute = Math.floor(this.state.timer / 60);
    let second = this.state.timer - minute * 60;
    if(second<10){
      second="0"+second;
    }
    if(minute<10){
      minute="0"+minute;
    }
    return minute + ':' + second;
  }
  breakDecrement(){
    if(this.state.stopped && this.state.breakL>1){
      this.setState({
        breakL:this.state.breakL-1
      })
    }
  }
  breakIncrement(){
    if(this.state.stopped && this.state.breakL<60){
      this.setState({
        breakL:this.state.breakL+1
      })
    }
  }
  sessionDecrement(){
    if(this.state.stopped && this.state.sessionL>1){
      this.setState({
        sessionL:this.state.sessionL-1,
        timer:this.state.sessionL*60-60
      })
    }
  }
  sessionIncrement(){
    if(this.state.stopped && this.state.sessionL<60){
      this.setState({
        sessionL:this.state.sessionL+1,
        timer:this.state.sessionL*60+60
      })
    }
  }
  timeControl(){
    if(this.state.stopped){
      this.countDown();
      this.setState({ stopped:false });
    }else{
      this.setState({ stopped:true });
      clearInterval(interval);
    }
  }
  countDown(){
      interval=setInterval(this.dec,1000);
  }
  dec(){
    if(this.state.timer>0){
      this.setState({timer:this.state.timer-1});
    }else{
      clearInterval(interval);
      if(this.state.type==="Session"){
        this.setState({timer:this.state.breakL*60,type:"Break"});
      } else if(this.state.type==="Break"){
        this.setState({timer:this.state.sessionL*60,type:"Session"});
      }
      this.countDown();
    }
    if(this.state.timer===0){
      this.audioPlayer.play();
    }
  }
  render(){
    return(
    <div>
      <header id="main-title">25 + 5 Clock</header>
        
      <div id="container">
        <div id="timer-lengths">
          <div id="break-box">
            <div id="break-label">Break Length</div>
            <button id="break-decrement" onClick={this.breakDecrement}>
              <i className="fa fa-arrow-down fa-2x" />
            </button>
            <span id="break-length">{this.state.breakL}</span>
            <button id="break-increment" onClick={this.breakIncrement}>
              <i className="fa fa-arrow-up fa-2x" />
            </button>
          </div>
          <div id="session-box">
            <div id="session-label">Session Length</div>
            <button id="session-decrement" onClick={this.sessionDecrement}>
              <i className="fa fa-arrow-down fa-2x" />
            </button>
            <span id="session-length">{this.state.sessionL}</span>
            <button id="session-increment" onClick={this.sessionIncrement}>
              <i className="fa fa-arrow-up fa-2x" />
            </button>
          </div>
        </div>

        <div id="timer-display-control">
          <div id="timer-display">
            <div id="timer-label">{this.state.type}</div>
            <div id="time-left">{this.clockFormat()}</div>
          </div>

          <div id="timer-control">
            <button id="start_stop" onClick={this.timeControl}>
                <i className="fa fa-play fa-2x" /> 
                <i className="fa fa-pause fa-2x" />
            </button>
            <button id="reset" onClick={this.reset}>
                <i className="fa fa-refresh fa-2x" />
            </button>
          </div>
        </div>
        
      </div>
        <audio
          id="beep"
          ref={(alarm) => {
            this.audioPlayer = alarm;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
    );
  }
}

export default App;
