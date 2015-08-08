import React from 'react';

export default class Clock extends React.Component {
  constructor (props) {
    super(props);
  }

  convertSeconds () {
    let rawSeconds = this.props.time;
    let rawMinutes = rawSeconds % (60 * 60);
    let minutes = Math.floor(rawMinutes / 60);
    let tempSecs = rawMinutes % 60;
    let seconds = Math.ceil(tempSecs);
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  }

  render () {
    return (
      <time className='clock'>{ this.convertSeconds(this.props.time) }</time>
    );
  }
}
