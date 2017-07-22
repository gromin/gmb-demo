import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      greeting: null
    }
  }

  componentDidMount() {
    fetch('/me')
      .then(response => response.text())
      .then(response => this.setState({greeting: response}));
  }

  greeting() {
    if (this.state.greeting) {
      return (
        <p className="App-intro">
          {this.state.greeting}
        </p>
      );
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        { this.greeting() }
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
