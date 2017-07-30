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
    this.state = {
      searchString: this.props.search,
      selectedMachine: null
    }
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

  componentWillReceiveProps(nextProps) {
    // if (this.state.searchString !== nextProps.search) {
    //   this.setState({
    //     searchString: nextProps.search
    //   })
    // }
    this.setState({
      selectedMachine: this.selectedMachine(this.props.machines || [])
    })
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
    if (this.state.selectedMachine && this.state.selectedMachine._key) {
      return this.state.selectedMachine;
    }
  }

  selectedMachine(machines) {
    const selectedMachine = machines.find((machine) => machine.id === this.props.selectedMachine)
    console.log(selectedMachine)
    return selectedMachine
  }

  render() {
    const selectedMachine = this.selectedMachine(this.props.machines)
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
              <Col xs={selectedMachine ? 8 : 12}>
                <MachinesGrid machines={this.props.machines}
                              dispatch={this.props.dispatch}
                              searchString={this.props.search}
                              onRowSelect={this.onRowSelect}
                              selectedMachine={selectedMachine} />
              </Col>
              {selectedMachine ?  
                <Col xs={selectedMachine ? 4 : 0}>
                  <AutoAffix container={this} viewportOffsetTop={15}>
                    <div>
                      <MachineForm machine={selectedMachine}
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

  componentDidUpdate(prevProps, prevState) {
    if (!this.selectedMachine(this.props.machines)) {
      this.props.dispatch(updateSelectedMachine(null))
    }
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
