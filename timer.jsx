import React from 'react';
import Button from './button';
import Clock from './clock';

export default class Timer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      time: props.time,
      mode: props.mode,
      countOfBreaks: props.countOfBreaks,
      isStarted: props.isStarted
    };

    this.events = {
      end: new Event('onCountDownEnd')
    }

    window.addEventListener('onCountDownEnd', this.toggleMode.bind(this));
  }

  tick () {
    this.state.time > 0 ? this.decrementTime() : this.stopCountDown();
  }

  toggleCountDown () {
    this.state.isStarted ? this.pauseCountDown() : this.startCountDown();
  }

  startCountDown () {
    this.interval = setInterval(this.tick.bind(this), 1000);
    this.setState({ isStarted: true });
    document.body.classList.add('tick');
  }

  pauseCountDown () {
    clearInterval(this.interval);
    this.setState({ isStarted: false });
    document.body.classList.remove('tick');
  }

  stopCountDown () {
    this.pauseCountDown();
    window.dispatchEvent(this.events.end);
  }

  toggleMode () {
    this.pauseCountDown();
    let count = this.state.countOfBreaks;
    let currentMode = this.state.mode;

    if (currentMode == this.props.modes.work && count % 2 != 0 || count == 0) {
      this.notify(this.props.notifications.workEnd);
      this.shortBreak();
    } else if (currentMode == this.props.modes.work && count % 2 == 0 && count != 0) {
      this.notify(this.props.notifications.workEnd);
      this.longBreak();
    } else if (currentMode == this.props.modes.break || currentMode == this.props.modes.longBreak) {
      this.notify(this.props.notifications.breakEnd);
      this.work();
    }
  }

  shortBreak () {
    this.incrementBreaksCount();

    this.setState({
      time: this.props.times[0],
      mode: this.props.modes.break
    });

    document.body.classList.add('break');
  }

  longBreak () {
    this.incrementBreaksCount();

    this.setState({
      time: this.props.times[1],
      mode: this.props.modes.longBreak
    });

    document.body.classList.add('break');
  }

  work () {
    this.setState({
      time: this.props.times[2],
      mode: this.props.modes.work
    });

    document.body.classList.remove('break');
  }

  decrementTime () {
    this.setState({ time: this.state.time - 1 });
  }

  incrementBreaksCount () {
    this.setState({ countOfBreaks: this.state.countOfBreaks + 1 });
  }

  notify (message) {
    return new Notification(this.props.appName, {
      body: message
    });
  }

  shutDown () {
    window.close();
  }

  render () {
    return (
      <div className='timer'>
        <Clock time={ this.state.time } />
        <div className='buttons-group'>
          <Button onClick={ this.toggleCountDown.bind(this) } label={ this.state.isStarted ? 'Pause' : 'Start' } />
          <Button onClick={ this.toggleMode.bind(this) } label={ this.state.mode == this.props.modes.work ? 'Break' : 'Work' } />
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  appName: React.PropTypes.string,
  times: React.PropTypes.array,
  time: React.PropTypes.number,
  countOfBreaks: React.PropTypes.number,
  modes: React.PropTypes.object,
  mode: React.PropTypes.number,
  isStarted: React.PropTypes.bool,
  notifications: React.PropTypes.object
};

Timer.defaultProps = {
  appName: 'Tomatron',
  times: [ 300, 900, 1500 ], // Seconds
  time: 1500,
  countOfBreaks: 0,
  modes: {
    break: 'break',
    longBreak: 'long_break',
    work: 'work'
  },
  mode: 'work',
  isStarted: false,
  notifications: {
    breakEnd: 'Time to work. Concentrate!',
    workEnd: 'Work time is off. Take a cup of tea :)'
  }
};
