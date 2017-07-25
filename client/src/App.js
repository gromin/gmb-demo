import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  loadMachines,
  updateGreeting,
  updateMachine,
  updateSocketGreeting
} from './actions'

import { MachinesGrid } from './components/machinesGrid';

import './App.css';

const Nes = require('nes');

class App extends Component {
  constructor(props) {
    super(props)
    this.onSocketUpdate = this.onSocketUpdate.bind(this)
    this.saveMachine = this.saveMachine.bind(this)
  }

  componentDidMount() {
    const { dispatch, updateSocketGreeting, updateGreeting } = this.props

    this.socketClient = new Nes.Client('ws://localhost:3000/ws');

    dispatch(updateSocketGreeting('Connecting to websocket...'))
    this.socketClient
        .connect((err) => {
          this.socketClient.request('/ws', (err, payload) => {
            dispatch(updateSocketGreeting(payload))
          });
        });

    this.socketClient
        .subscribe('/ws/machines',
                   this.onSocketUpdate,
                   this.onSocketSubscribe)

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
    const { dispatch, updateMachine } = this.props
    dispatch(updateMachine(update))
  }

  saveMachine(machine) {
    const {id, name, owner} = machine
    fetch(`/api/machines/${id}`, {method: 'PUT', body: JSON.stringify({id, name, owner})})
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
        <MachinesGrid machines={machines} saveMachine={this.saveMachine} />
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
    loadMachines,
    updateGreeting,
    updateMachine,
    updateSocketGreeting
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
