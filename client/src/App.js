import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  loadMachines,
  updateGreeting,
  updateMachine
} from './actions'

import { MachinesGrid } from './components/machinesGrid';
import { Greeting } from './components/greeting';

import './App.css';

const Nes = require('nes');

class App extends Component {
  constructor(props) {
    super(props)
    this.onSocketConnect = this.onSocketConnect.bind(this)
    this.onSocketSubscribe = this.onSocketSubscribe.bind(this)
    this.onSocketUpdate = this.onSocketUpdate.bind(this)
    this.saveMachine = this.saveMachine.bind(this)
  }

  componentDidMount() {
    this.connectToApi();
    this.connectToWebsocket();
  }

  connectToApi() {
    const { dispatch, updateGreeting } = this.props

    dispatch(updateGreeting('Waiting...', 'fromApi'))
    fetch('/api/greet/user')
      .then(response => response.text())
      .then(response => dispatch(updateGreeting(response, 'fromApi')))

    fetch('/api/machines')
      .then(response => response.json())
      .then(response => dispatch(loadMachines(Object.values(response))))
  }

  connectToWebsocket() {
    const { dispatch, updateGreeting } = this.props

    dispatch(updateGreeting('Connecting to websocket...', 'fromWebsocket'))

    this.socketClient = new Nes.Client('ws://localhost:3000/ws')
    this.socketClient.connect(this.onSocketConnect)
    this.socketClient.subscribe('/ws/machines', this.onSocketUpdate, this.onSocketSubscribe)
  }

  onSocketConnect(err) {
    const { dispatch, updateGreeting } = this.props

    this.socketClient.request('/ws', (err, payload) => {
      if (err) {
        dispatch(updateGreeting('Couldn\'t establish websocket connection', 'fromWebsocket'))
      }
      else {
        dispatch(updateGreeting(payload, 'fromWebsocket'))
      }
    });
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

  render() {
    return (
      <div className="App">
        <Greeting text={this.props.greeting.fromApi} />
        <Greeting text={this.props.greeting.fromWebsocket} />
        <MachinesGrid machines={this.props.machines} saveMachine={this.saveMachine} />
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
    updateMachine
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
