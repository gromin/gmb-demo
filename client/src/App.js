import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateGreeting, updateSocketGreeting, loadMachines } from './actions'

import { MachinesGrid } from './components/machinesGrid';

import './App.css';

const Nes = require('nes');

class App extends Component {
  constructor(props) {
    super(props)
    this.onSocketUpdate = this.onSocketUpdate.bind(this);
  }

  componentDidMount() {
    const { dispatch, updateSocketGreeting, updateGreeting } = this.props

    this.socketClient = new Nes.Client('ws://localhost:3000/ws');

    dispatch(updateSocketGreeting('Connecting to websocket...'))
    this.socketClient
        .connect((err) => {
          this.socketClient.request('/ws', (err, payload) => {
            dispatch(updateSocketGreeting(payload));
          });
        });

    this.socketClient
        .subscribe('/ws/machines',
                   this.onSocketUpdate,
                   this.onSocketSubscribe);

    dispatch(updateGreeting('Waiting...'))
    fetch('/api/greet/user')
      .then(response => response.text())
      .then(response => dispatch(updateGreeting(response)))

    fetch('/api/machines')
      .then(response => response.json())
      .then(response => dispatch(loadMachines(Object.values(response))))
  }

  onSocketSubscribe(err) {}

  onSocketUpdate(update, flags) {
    console.log(update);
  }

  greeting() {
    const { greeting } = this.props
    return (
      <p className="App-intro">
        {greeting}
      </p>
    )
  }

  socketGreeting() {
    const { socketGreeting } = this.props
    return (
      <p className="App-intro">
        {socketGreeting}
      </p>
    )
  }

  render() {
    const { machines } = this.props
    return (
      <div className="App">
        { this.greeting() }
        { this.socketGreeting() }
        <MachinesGrid machines={machines} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { greeting, socketGreeting, machines } = state
  return {
    greeting,
    socketGreeting,
    machines
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    updateGreeting,
    updateSocketGreeting,
    loadMachines
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
