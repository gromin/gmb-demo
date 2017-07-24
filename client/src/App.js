import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Nes = require('nes');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      greeting: null,
      socketGreeting: null
    }
    this.onSocketUpdate = this.onSocketUpdate.bind(this);
  }

  componentDidMount() {
    this.socketClient = new Nes.Client('ws://localhost:3000/ws');

    this.socketClient
        .connect((err) => {
          this.socketClient.request('/ws', (err, payload) => {
            console.log('socket', payload);
            this.setState({socketGreeting: payload});
          });
        });

    this.socketClient
        .subscribe('/ws/machines',
                   this.onSocketUpdate,
                   this.onSocketSubscribe);

    fetch('/api/greet/user')
      .then(response => response.text())
      .then(response => this.setState({greeting: response}));
  }

  onSocketSubscribe(err) {}

  onSocketUpdate(update, flags) {
    console.log(update);
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

  socketGreeting() {
    if (this.state.socketGreeting) {
      return (
        <p className="App-intro">
          {this.state.socketGreeting}
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
        { this.socketGreeting() }
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
