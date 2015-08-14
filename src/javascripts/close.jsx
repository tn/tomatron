import React from 'react';

export default class Close extends React.Component {
  render () {
    return (
      <a onClick={ this.props.onClick } className='close'></a>
    );
  }
}
