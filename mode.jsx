import React from 'react';

export default class Mode extends React.Component {
  render () {
    return (
      <small className='mode'>{ this.props.label }</small>
    );
  }
}
