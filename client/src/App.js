import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  loadMachines,
  updateGreeting,
  updateMachine,
  updateSelectedMachine,
  updateSearch
} from './actions'

import { Grid, Col, Row } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';
import { Greeting } from './components/greeting';
import { MachineForm } from './components/machineForm';
import { MachinesGrid } from './components/machinesGrid';
import { SearchBar } from './components/searchBar';

import './App.css';

const Nes = require('nes');

class App extends Component {
  constructor(props) {
    super(props)
    this.onSocketConnect = this.onSocketConnect.bind(this)
    this.onSocketSubscribe = this.onSocketSubscribe.bind(this)
    this.onSocketUpdate = this.onSocketUpdate.bind(this)
    this.onSaveMachine = this.onSaveMachine.bind(this)
    this.onSearchBarChange = this.onSearchBarChange.bind(this)
    this.onRowSelect = this.onRowSelect.bind(this)
  }

  componentDidMount() {
    this.connectToApi();
    this.connectToWebsocket();
  }

  connectToApi() {
    const { dispatch, updateGreeting } = this.props

    // TODO async action
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

    // TODO async action
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

  onSaveMachine(machine) {
    const {id, name, owner} = machine

    fetch(`/api/machines/${id}`, {method: 'PUT', body: JSON.stringify({id, name, owner})})
  }

  onSearchBarChange(value) {
    const { dispatch, updateSearch} = this.props

    dispatch(updateSearch(value))
  }

  onRowSelect(machineId) {
    const { dispatch } = this.props

    dispatch(updateSelectedMachine(machineId))
  }

  isMachineSelected() {
    return this.props.selectedMachine;
  }

  selectedMachine() {
    const selectedMachine = this.props.machines.find((machine) => machine.id === this.props.selectedMachine)
    return selectedMachine
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Grid>
            <Row>
              <Col xs={12} md={12}>
                <Greeting text={this.props.greeting.fromApi} />
                <Greeting text={this.props.greeting.fromWebsocket} />
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="container">
          <Grid>
            <Row>
              <Col xs={12} md={12}>
                <SearchBar onChange={this.onSearchBarChange} />
              </Col>
            </Row>
            <Row>
              <Col xs={this.isMachineSelected() ? 8 : 12}>
                <MachinesGrid machines={this.props.machines}
                              searchString={this.props.search}
                              onRowSelect={this.onRowSelect} />
              </Col>
              {this.isMachineSelected() ?  
                <Col xs={this.isMachineSelected() ? 4 : 0}>
                  <AutoAffix container={this} viewportOffsetTop={15}>
                    <div>
                      <MachineForm machine={this.selectedMachine()}
                                   onSaveMachine={this.onSaveMachine} />
                    </div>
                  </AutoAffix>
                </Col>
                :
                null}
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { greeting, socketGreeting, machines, search, selectedMachine } = state
  return {
    greeting,
    socketGreeting,
    machines,
    selectedMachine,
    search
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadMachines,
    updateGreeting,
    updateMachine,
    updateSelectedMachine,
    updateSearch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
