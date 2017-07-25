import React, { Component } from 'react';

class Greeting extends Component {
  render() {
    return (
      <p className="App-intro">
        {this.props.text}
      </p>
    )
  }
}

export { Greeting }
