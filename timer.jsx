import React from 'react';
import Button from './button';
import Clock from './clock';
import Mode from './mode';

export default class Timer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      times: props.times,
      time: props.times[2],
      modes: props.modes,
      mode: props.mode,
      modesLabels: props.modesLabels,
      countOfRests: props.countOfRests,
      isStarted: props.isStarted
    };

    this.tick = this.tick.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.pauseCountDown = this.pauseCountDown.bind(this);
    this.resetCountDown = this.resetCountDown.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.shortRest = this.shortRest.bind(this);
    this.longRest = this.longRest.bind(this);
    this.work = this.work.bind(this);
    this.shutDown = this.shutDown.bind(this);
  }

  tick () {
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 });
    } else if (this.state.countOfRests % 2 !== 0 && this.state.mode === 2 || this.state.countOfRests === 0) {
      this.notify('Work Time is off!');
      this.shortRest();
      this.setState({ countOfRests: this.state.countOfRests + 1 });
    } else if (this.state.countOfRests % 2 === 0 && this.state.mode === 2 && this.state.countOfRests > 0) {
      this.notify('Work Time is off!');
      this.longRest();
      this.setState({ countOfRests: this.state.countOfRests + 1 });
    } else if (this.state.mode !== 2 ) {
      this.notify('Time to Work!');
      this.work();
    }
  }

  startCountDown () {
    if (!this.state.isStarted) {
      this.interval = setInterval(this.tick, 1000);
      this.setState({
        isStarted: true
      });
    }
  }

  pauseCountDown () {
    if (this.state.isStarted) {
      this.componentWillUnmount();
      this.setState({ isStarted: false });
    }
  }

  resetCountDown () {
    if (this.state.isStarted) {
      this.pauseCountDown();
    }

    this.componentWillUnmount();
    this.setState({
      time: this.state.times[2],
      isStarted: false,
      mode: this.state.modes[2]
    });
    document.body.classList.remove('rest');
  }

  toggleMode (mode) {
    this.resetCountDown();
    this.setState({
      mode: mode,
      time: this.state.times[mode]
    });
  }

  shortRest () {
    this.toggleMode(0);
    document.body.classList.add('rest');
  }

  longRest () {
    this.toggleMode(1);
    document.body.classList.add('rest');
  }

  work () {
    this.toggleMode(2);
    document.body.classList.remove('rest');
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  notify (message) {
    return new Notification('Tomatron', {
      body: message
    });
  }

  shutDown () {
    console.log('shutDown');
    window.close();
  }

  render () {
    return (
      <div className='timer'>
        <Mode label={ this.state.modesLabels[this.state.mode] } />
        <Clock time={ this.state.time } />
        <div className='buttons-group'>
          <Button onClick={ this.startCountDown } label='Start' />
          <Button onClick={ this.pauseCountDown } label='Pause' />
          <Button onClick={ this.resetCountDown } label='Reset' />
        </div>
        <div className='buttons-group buttons-group--long'>
          <Button onClick={ this.shortRest } label={ this.state.modesLabels[0] } />
          <Button onClick={ this.longRest } label={ this.state.modesLabels[1] } />
          <Button onClick={ this.work } label={ this.state.modesLabels[2] } />
        </div>
        <Button onClick={ this.shutDown } label='Quit' />
      </div>
    );
  }
}

Timer.propTypes = {
  times: React.PropTypes.array,
  time: React.PropTypes.number,
  countOfRests: React.PropTypes.number,
  modes: React.PropTypes.array,
  mode: React.PropTypes.number,
  modesLabels: React.PropTypes.array,
  isStarted: React.PropTypes.boolean
};

Timer.defaultProps = {
  times: [ 300, 900, 1500 ], // Seconds
  time: 1500,
  countOfRests: 0,
  modes: [ 0, 1, 2 ],
  mode: 2,
  modesLabels: [ 'Short Rest', 'Long Rest', 'Work' ],
  isStarted: false
};
