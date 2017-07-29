import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class Greeting extends Component {
  render() {
    return (
      <Alert bsStyle="success">
        {this.props.text}
      </Alert>
    )
  }
}

export { Greeting }
